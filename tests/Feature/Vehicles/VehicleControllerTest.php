<?php

declare(strict_types=1);

use App\Models\User;
use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;

it('shows vehicles dashboard for authenticated user', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    actingAs($user);
    $response = get('/vehicles/dashboard');
    $response->assertOk();
});

it('blocks unauthenticated user from vehicles dashboard', function () {
    $response = get('/vehicles/dashboard');
    $response->assertRedirect('/login');
});
