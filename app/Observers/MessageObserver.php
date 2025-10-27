<?php

namespace App\Observers;

use App\Events\SocketNotification;

use App\Models\User;

use App\Models\Chat\Message;
use App\Models\Chat\Conversation;

use App\Notifications\ChatMessageNotification;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MessageObserver
{
    public function created(Message $message)
    {
        try {
            if ($message->sender_id === $message->receiver_id) {
                return;
            }

            $receiver = User::find($message->receiver_id);

            if ($receiver) {
                $receiver->notify(new ChatMessageNotification($message));

                // dispatch a SocketNotification for real-time delivery (also covered by broadcast channel)
                try {
                    SocketNotification::dispatch([
                        'notifiable_type' => User::class,
                        'notifiable_id' => $receiver->id,
                        'data' => [
                            'message_id' => $message->id,
                            'sender_id' => $message->sender_id,
                            'snippet' => Str::limit($message->message, 200),
                        ],
                    ]);
                } catch (\Throwable $e) {
                    // swallow
                }
            }
        } catch (\Throwable $e) {
            // swallow
        }
    }
    public function deleting(Message $message) {
        if ($message->attachments && $message->attachments->count() > 0) {
            $message->attachments->each(function ($attachment) {
                $dir = dirname($attachment->path);
                Storage::disc('public')->deleteDirectory($dir);
            });

            $message->attachments()->delete();
        }

        $conversation = Conversation::where('last_message_id', $message->id)->first();

        if ($conversation) {
            $prevMessage = Message::where(function ($query) use ($message) {
                $query->where('sender_id', $message->sender_id)
                    ->where('receiver_id', $message->receiver_id)
                    ->orWhere('sender_id', $message->receiver_id)
                    ->where('receiver_id', $message->sender_id);
            })
                ->where('id', '!=', $message->id)
                ->latest()
                ->limit(1)
                ->first();

            if ($prevMessage) {
                $conversation->last_message_id = $prevMessage->id;
                $conversation->save();
            }
        }
    }
}
