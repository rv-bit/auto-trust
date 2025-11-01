<?php

declare(strict_types=1);

use App\Models\User;
use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;

it('returns 200 for chat route when authenticated', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    actingAs($user);
    $response = get('/chat');
    $response->assertOk();
});

it('redirects unauthenticated user from chat route', function () {
    $response = get('/chat');
    $response->assertRedirect('/login');
});

it('returns 200 for settings route when authenticated', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    actingAs($user);
    $response = get('/settings/profile');
    $response->assertOk();
});

it('redirects unauthenticated user from settings route', function () {
    $response = get('/settings/profile');
    $response->assertRedirect('/login');
});
