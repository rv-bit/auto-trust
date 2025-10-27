<?php

namespace App\Http\Controllers\Chat;
use App\Http\Controllers\Controller;

use App\Http\Resources\Chat\MessageResource;

use App\Models\Chat\Conversation;
use App\Models\Chat\Message;
use App\Models\User;

use App\Events\SocketMessage;
use App\Events\MessageDeleted;

use App\Http\Requests\Chat\StoreMessageRequest;

use App\Notifications\MessageSeenNotification;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use Inertia\Inertia;
use Inertia\Response;

class MessageController extends Controller
{
    /**
     * Show the chat page with or without selected id / param id.
    */
    public function show(Request $request): Response
    {
        return Inertia::render('chat/page');
    }

    public function byUser(User $user): Response
    {
        $messages = Message::where('sender_id', auth()->id())
            ->where('receiver_id', $user->id)
            ->orWhere('sender_id', $user->id)
            ->where('receiver_id' , auth()->id())
            ->latest()
            ->paginate(10);

        return Inertia::render('chat/page', [
            'selectedConversation' => $user->toConversationArray(),
            'messages' => MessageResource::collection($messages)
        ]);
    }
    
    public function loadOlder(Message $message)
    {
        $messages = Message::where('created_at', '<' ,$message->created_at)
        ->where(function($query) use ($message) {
            $query->where('sender_id',$message->sender_id)
                ->where('receiver_id',$message->receiver_id)
                ->orWhere('sender_id',$message->receiver_id)
                ->where('receiver_id', $message->sender_id);
        })
            ->latest()
            ->paginate(10);

        return MessageResource::collection($messages);
    }

    public function store(StoreMessageRequest $request)
    {
        $data = $request->validated();
        $data['sender_id'] = auth()->id();
        $receiverId = $data['receiver_id'] ?? null;

        $message = Message::create($data);

        if ($receiverId) {
            Conversation::updateConversationWithMessage($receiverId, auth()->id(), $message);
        }

        SocketMessage::dispatch($message);

        return new MessageResource($message);
    }
    
    public function destroy(Message $message): JsonResponse
    {
        if ($message->sender_id !== auth()->id()) {
            return response()->json(['message'=> 'Forbidden'],403);
        }

        $deletedMessageData = [
            'id' => $message->id,
            'sender_id' => $message->sender_id,
            'receiver_id' => $message->receiver_id,
            'message' => $message->message,
            'created_at' => $message->created_at,
        ];

        $lastMessage = null;
        $conversation = Conversation::where('last_message_id', $message->id)->first();
        
        $message->delete();
        
        if ($conversation) {
            $conversation->refresh();
            $lastMessage = $conversation->lastMessage;
        }

        MessageDeleted::dispatch($deletedMessageData, $lastMessage);

        return response()->json(['message'=> $lastMessage ? new MessageResource($lastMessage): null],200);
    }

    /**
     * Mark messages in a conversation with the given user as seen (set seen_at)
     * Returns updated conversation data to refresh UI
     */
    public function markConversationSeen(Request $request, User $user)
    {
        $authId = $request->user()->id;

        // Mark messages where receiver is auth user and sender is the given user
        Message::where('sender_id', $user->id)
            ->where('receiver_id', $authId)
            ->whereNull('seen_at')
            ->update(['seen_at' => now()]);

        // Get updated conversation data
        $updatedConversation = $user->toConversationArray();

        // Notify the sender that their messages have been seen
        $user->notify(new MessageSeenNotification($updatedConversation));

        return response()->json([
            'message' => 'OK',
            'conversation' => $updatedConversation
        ], 200);
    }
}
