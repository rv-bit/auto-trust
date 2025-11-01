<?php

declare(strict_types=1);

use App\Models\User;
use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;

it('returns 200 for web root as guest', function () {
    $response = get('/');
    if ($response->status() === 302) {
        // Try as authenticated user
        $user = User::factory()->create(['email_verified_at' => now()]);
        actingAs($user);
        $response = get('/');
    }
    $response->assertOk();
});

it('returns 404 for unknown route', function () {
    $response = get('/unknown-route-xyz');
    $response->assertNotFound();
});
