<?php

namespace App\Listeners;

use App\Models\CheckoutSessions;

use Illuminate\Support\Facades\Log;
use Laravel\Cashier\Cashier;
use Laravel\Cashier\Events\WebhookReceived;

class StripeEventListener
{
    public function handle(WebhookReceived $event): void
    {
        if ($event->payload['type'] === 'checkout.session.completed') {
            $session = $event->payload['data']['object']; // Get the checkout session object
            $sessionId = $session['id']; // Extract the session ID

            $checkout = CheckoutSessions::where('stripe_session_id', $sessionId)->first();
            $checkoutSessionData = Cashier::stripe()->checkout->sessions->allLineItems($sessionId);
            $checkoutItems = $checkoutSessionData->data;

            foreach ($checkoutItems as $item) {
            };

            if (!$checkout) {
                CheckoutSessions::create([
                    'stripe_session_id' => $sessionId,
                    'paid' => 'complete',
                ]);
            } else {
                $checkout->update(['paid' => 'complete']);
            }

            Log::alert('NEW CHECKOUT SUCCEEDED - Session ID: ' . $sessionId);
        }
    }
}
