<?php

namespace App\Events;

use App\Http\Resources\Chat\MessageResource;
use App\Models\Chat\Message;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageDeleted implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public array $deletedMessage,
        public ?Message $prevMessage = null
    ) {}

    public function broadcastWith(): array 
    {
        return [
            'message' => $this->deletedMessage,
            'prevMessage' => $this->prevMessage ? new MessageResource($this->prevMessage) : null,
        ];
    }

    public function broadcastOn(): array
    {
        $senderId = $this->deletedMessage['sender_id'];
        $receiverId = $this->deletedMessage['receiver_id'];
        
        $channels = [
            new PrivateChannel('message.user.'.collect([$senderId, $receiverId])->sort()->implode('-'))
        ];

        return $channels;
    }
}