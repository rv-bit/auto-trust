<?php

declare(strict_types=1);

use App\Models\Notification;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('can create a notification', function () {
    $user = User::factory()->create();
    
    $notification = Notification::create([
        'notifiable_type' => User::class,
        'notifiable_id' => $user->id,
        'type' => 'test-notification',
        'data' => ['message' => 'Test message'],
    ]);
    
    expect($notification->type)->toBe('test-notification');
    expect($notification->data)->toBe(['message' => 'Test message']);
    expect($notification->id)->not->toBeNull();
});

it('casts data as array', function () {
    $user = User::factory()->create();
    
    $notification = Notification::create([
        'notifiable_type' => User::class,
        'notifiable_id' => $user->id,
        'type' => 'test',
        'data' => ['key' => 'value'],
    ]);
    
    expect($notification->data)->toBeArray();
});

it('can mark notification as read', function () {
    $user = User::factory()->create();
    
    $notification = Notification::create([
        'notifiable_type' => User::class,
        'notifiable_id' => $user->id,
        'type' => 'test',
        'data' => [],
    ]);
    
    expect($notification->read_at)->toBeNull();
    
    $notification->markAsRead();
    
    expect($notification->read_at)->not->toBeNull();
});

it('scopes unread notifications', function () {
    $user = User::factory()->create();
    
    Notification::create([
        'notifiable_type' => User::class,
        'notifiable_id' => $user->id,
        'type' => 'test',
        'data' => [],
        'read_at' => now(),
    ]);
    
    Notification::create([
        'notifiable_type' => User::class,
        'notifiable_id' => $user->id,
        'type' => 'test',
        'data' => [],
    ]);
    
    $unreadCount = Notification::unread()->count();
    
    expect($unreadCount)->toBe(1);
});

it('has notifiable morphTo relationship', function () {
    $user = User::factory()->create();
    
    $notification = Notification::create([
        'notifiable_type' => User::class,
        'notifiable_id' => $user->id,
        'type' => 'test',
        'data' => [],
    ]);
    
    expect($notification->notifiable)->toBeInstanceOf(User::class);
    expect($notification->notifiable->id)->toBe($user->id);
});

