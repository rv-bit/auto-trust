<?php

namespace App\Notifications;

use App\Models\Chat\Message;
use Illuminate\Bus\Queueable;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\BroadcastMessage;

use Illuminate\Support\Str;

class ChatMessageNotification extends Notification
{
    use Queueable;

    public function __construct(protected Message $message)
    {
    }

    public function via($notifiable)
    {
        return ['database', 'broadcast'];
    }

    public function toDatabase($notifiable)
    {
        return [
            'message_id' => $this->message->id,
            'sender_id' => $this->message->sender_id,
            'snippet' => Str::limit($this->message->message, 200),
        ];
    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'notification' => $this->toArray($notifiable),
        ]);
    }

    public function toArray($notifiable)
    {
        return $this->toDatabase($notifiable);
    }
}
