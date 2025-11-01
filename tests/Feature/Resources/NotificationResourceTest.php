<?php

declare(strict_types=1);

use App\Http\Resources\NotificationResource;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('transforms notification to array', function () {
    $user = User::factory()->create();
    
    $notification = Notification::create([
        'id' => '123e4567-e89b-12d3-a456-426614174000',
        'type' => 'App\Notifications\GenericNotification',
        'notifiable_type' => 'App\Models\User',
        'notifiable_id' => $user->id,
        'data' => [
            'message' => 'Test notification',
            'title' => 'Test Title',
        ],
        'read_at' => null,
    ]);
    
    $resource = new NotificationResource($notification);
    $array = $resource->toArray(request());
    
    expect($array)->toHaveKeys(['id', 'type', 'data', 'read_at', 'created_at']);
    expect($array['id'])->toBe('123e4567-e89b-12d3-a456-426614174000');
    expect($array['type'])->toBe('App\Notifications\GenericNotification');
    expect($array['data'])->toBeArray();
    expect($array['data']['message'])->toBe('Test notification');
    expect($array['read_at'])->toBeNull();
});

it('includes read_at when notification is read', function () {
    $user = User::factory()->create();
    $readAt = now();
    
    $notification = Notification::create([
        'id' => '123e4567-e89b-12d3-a456-426614174001',
        'type' => 'App\Notifications\GenericNotification',
        'notifiable_type' => 'App\Models\User',
        'notifiable_id' => $user->id,
        'data' => [
            'message' => 'Read notification',
        ],
        'read_at' => $readAt,
    ]);
    
    $resource = new NotificationResource($notification);
    $array = $resource->toArray(request());
    
    expect($array['read_at'])->not->toBeNull();
    expect($array['read_at'])->toBeInstanceOf(\Illuminate\Support\Carbon::class);
});
