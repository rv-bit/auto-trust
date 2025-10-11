<?php

namespace App\Listeners;

use Laravel\Cashier\Events\WebhookReceived;
use Illuminate\Support\Facades\Log;

class StripeEventListener
{
    public function handle(WebhookReceived $event): void
    {

        Log::info('General Stripe webhook received', [
            'type' => $event->payload['type'],
        ]);
    }
}
