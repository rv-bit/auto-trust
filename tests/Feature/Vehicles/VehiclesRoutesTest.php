<?php

declare(strict_types=1);

use App\Models\User;
use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;

it('returns 200 for vehicles dashboard when authenticated', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    actingAs($user);
    $response = get('/vehicles/dashboard');
    $response->assertOk();
});

it('redirects unauthenticated user from vehicles dashboard', function () {
    $response = get('/vehicles/dashboard');
    $response->assertRedirect('/login');
});

it('returns 200 for valid vehicle listing', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    actingAs($user);
    
    $response = get('/vehicles/used-cars');
    $response->assertOk();
    $response = get('/vehicles/new-cars');
    $response->assertOk();
});

it('returns 404 for invalid vehicle listing', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    actingAs($user);
    
    $response = get('/vehicles/invalid-listing');
    $response->assertNotFound();
});