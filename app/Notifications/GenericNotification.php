<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\BroadcastMessage;

class GenericNotification extends Notification
{
    use Queueable;

    public function __construct(protected string $type, protected array $payload = [])
    {
    }

    public function via($notifiable)
    {
        return ['database', 'broadcast'];
    }

    public function toDatabase($notifiable)
    {
        return array_merge(['type' => $this->type], $this->payload);
    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage(['notification' => $this->toArray($notifiable)]);
    }

    public function toArray($notifiable)
    {
        return $this->toDatabase($notifiable);
    }
}
