<?php

declare(strict_types=1);

use App\Http\Resources\User\UserResource;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;

uses(RefreshDatabase::class);

it('transforms user to array', function () {
    $user = User::factory()->create([
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'is_admin' => false,
    ]);
    
    $resource = new UserResource($user);
    $array = $resource->toArray(request());
    
    expect($array)->toHaveKeys([
        'id',
        'avatar',
        'name',
        'email',
        'created_at',
        'updated_at',
        'is_admin',
        'last_message',
        'last_message_date'
    ]);
    expect($array['name'])->toBe('John Doe');
    expect($array['email'])->toBe('john@example.com');
    expect($array['is_admin'])->toBe(false);
    expect($array['avatar'])->toBeNull();
});

it('includes avatar url when user has avatar', function () {
    $user = User::factory()->create([
        'name' => 'Jane Doe',
        'avatar' => 'avatars/jane.jpg',
    ]);
    
    $resource = new UserResource($user);
    $array = $resource->toArray(request());
    
    expect($array['avatar'])->toBeString();
    expect($array['avatar'])->toContain('avatars/jane.jpg');
})->skip('Requires S3 storage configuration');

it('correctly casts is_admin to boolean', function () {
    $admin = User::factory()->create(['is_admin' => true]);
    $regularUser = User::factory()->create(['is_admin' => false]);
    
    $adminResource = new UserResource($admin);
    $userResource = new UserResource($regularUser);
    
    $adminArray = $adminResource->toArray(request());
    $userArray = $userResource->toArray(request());
    
    expect($adminArray['is_admin'])->toBe(true);
    expect($userArray['is_admin'])->toBe(false);
});
