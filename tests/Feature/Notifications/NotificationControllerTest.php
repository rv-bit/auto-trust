<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Notifications\DatabaseNotification;
use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;
use function Pest\Laravel\post;


it('shows notifications for authenticated user', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    $user->notify(new \App\Notifications\GenericNotification('test', ['foo' => 'bar']));
    actingAs($user);
    $response = get('/notifications');
    $response->assertOk();
    $response->assertJsonFragment(['type' => 'test']);
});

it('blocks unauthenticated user from notifications', function () {
    $response = get('/notifications');
    $response->assertRedirect('/login');
});

it('marks a notification as seen', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    actingAs($user);
    $user->notify(new \App\Notifications\GenericNotification('test', ['foo' => 'bar']));
    $notification = $user->notifications()->first();
    $response = post("/notifications/{$notification->id}/mark-seen");
    $response->assertOk();
    $notification->refresh();
    expect($notification->read_at)->not->toBeNull();
});

it('forbids marking another user\'s notification as seen', function () {
    $user1 = User::factory()->create(['email_verified_at' => now()]);
    $user2 = User::factory()->create(['email_verified_at' => now()]);
    $user1->notify(new \App\Notifications\GenericNotification('test', []));
    $notification = $user1->notifications()->first();
    actingAs($user2);
    $response = post("/notifications/{$notification->id}/mark-seen");
    $response->assertForbidden();
});

it('marks all notifications as seen', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    actingAs($user);
    $user->notify(new \App\Notifications\GenericNotification('test', []));
    $user->notify(new \App\Notifications\GenericNotification('test2', []));
    $response = post('/notifications/mark-all-seen');
    $response->assertOk();
    $user->refresh();
    expect($user->unreadNotifications)->toHaveCount(0);
});

it('creates a notification via store', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    actingAs($user);
    $payload = [
        'type' => 'test',
        'notifiable_type' => User::class,
        'notifiable_id' => $user->id,
        'data' => ['foo' => 'bar'],
    ];
    $response = post('/notifications', $payload);
    $response->assertOk();
    $user->refresh();
    expect($user->notifications()->where('type', 'like', '%GenericNotification%')->count())->toBeGreaterThan(0);
});

it('returns 404 if notifiable not found', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    actingAs($user);
    $payload = [
        'type' => 'test',
        'notifiable_type' => User::class,
        'notifiable_id' => 999999,
        'data' => ['foo' => 'bar'],
    ];
    $response = post('/notifications', $payload);
    $response->assertNotFound();
});

it('validates notification store payload', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    actingAs($user);
    $payload = [
        'notifiable_type' => User::class,
        'notifiable_id' => $user->id,
    ];
    $response = post('/notifications', $payload);
    $response->assertSessionHasErrors(['type']);
});
