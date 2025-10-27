<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SocketNotification implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public array $notificationPayload)
    {
    }

    public function broadcastWith(): array
    {
        return $this->notificationPayload;
    }

    public function broadcastOn(): array
    {
        // Broadcast to private user notification channel
        return [new PrivateChannel('notification.user.' . ($this->notificationPayload['notifiable_id'] ?? ''))];
    }
}
