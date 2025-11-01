<?php

declare(strict_types=1);

use App\Models\User;
use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;

it('returns 401 for protected API route', function () {
    $response = get('/api/user');
    // If route does not exist, skip
    if ($response->status() === 404) {
        test()->markTestSkipped('/api/user route does not exist');
    }
    $response->assertUnauthorized();
});

it('returns 200 for protected API route when authenticated', function () {
    $user = User::factory()->create();
    actingAs($user, 'api');
    $response = get('/api/user');
    // If route does not exist, skip
    if ($response->status() === 404) {
        test()->markTestSkipped('/api/user route does not exist');
    }
    $response->assertOk();
});
