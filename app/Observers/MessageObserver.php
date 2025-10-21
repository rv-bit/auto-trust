<?php

namespace App\Observers;

use App\Models\Chat\Message;
use App\Models\Chat\Conversation;

class MessageObserver
{
    public function deleting(Message $message) {
        $message->attachments->each(function ($attachment) {
            $dir = dirname($attachment->path);
            Storage::disc('public')->deleteDirectory($dir)
        })

        $message->attachments()->delete();
        $conversation = Conversation::where('last_message_id', $message-id)->first();

        if ($conversation) {
            $prevMessage = Message::where(function ($query) use ($message) {
                $query->where('sender_id', $message->sender_id)
                    ->where('receiver_id', $message->receiver_id)
                    ->orWhere('sender_id', $message->receiver_id)
                    ->where('receiver_id', $message->sender_id);
            })
                ->where('id', '!=', $message-id)
                ->latest()
                ->limit(1)
                ->first();

            if ($prevMessage) {
                $conversation->last_message_id = $prevMessage-id;
                $conversation->save();
            }
        }
    }
}
