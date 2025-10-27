<?php

namespace App\Notifications;

use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;

class MessageSeenNotification extends Notification implements ShouldBroadcast
{
    public function __construct(
        private array $conversation
    ) {}

    public function via($notifiable)
    {
        return ['broadcast'];
    }

    public function toBroadcast($notifiable)
    {
        return (new BroadcastMessage([
            'conversation' => $this->conversation,
        ]))->onConnection('sync');
    }

    public function broadcastOn()
    {
        return [new PrivateChannel('App.Models.User.' . $this->conversation['id'])];
    }
}