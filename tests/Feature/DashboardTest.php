<?php

declare(strict_types=1);

use App\Models\User;
use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;

it('guests are redirected to the login page', function () {
    $response = get('/dashboard');
    $response->assertRedirect('/login');
});

it('authenticated users can visit the dashboard', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    actingAs($user);
    $response = get('/dashboard');
    $response->assertOk();
});