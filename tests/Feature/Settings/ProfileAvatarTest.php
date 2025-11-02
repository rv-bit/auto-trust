<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

uses(RefreshDatabase::class);

it('can upload an avatar when updating profile', function () {
    Storage::fake('public');
    
    $user = User::factory()->create();
    
    $file = UploadedFile::fake()->image('avatar.jpg');
    
    $response = $this->actingAs($user)->patch(route('profile.update'), [
        'name' => $user->name,
        'email' => $user->email,
        'avatar' => $file,
    ]);
    
    $response->assertRedirect(route('profile.edit'));
    
    $user->refresh();
    
    expect($user->avatar)->not->toBeNull();
    expect($user->avatar)->toContain('avatars/');
    
    expect(Storage::disk('public')->exists($user->avatar))->toBeTrue();
});

it('deletes old avatar when uploading a new one', function () {
    Storage::fake('public');
    
    $user = User::factory()->create([
        'avatar' => 'avatars/old-avatar.jpg',
    ]);
    
    // Create the old avatar file
    Storage::disk('public')->put('avatars/old-avatar.jpg', 'old content');
    
    $newFile = UploadedFile::fake()->image('new-avatar.jpg');
    
    $response = $this->actingAs($user)->patch(route('profile.update'), [
        'name' => $user->name,
        'email' => $user->email,
        'avatar' => $newFile,
    ]);
    
    $response->assertRedirect(route('profile.edit'));
    
    $user->refresh();
    
    // Old avatar should be deleted
    expect(Storage::disk('public')->exists('avatars/old-avatar.jpg'))->toBeFalse();
    
    // New avatar should exist
    expect(Storage::disk('public')->exists($user->avatar))->toBeTrue();
    expect($user->avatar)->not->toBe('avatars/old-avatar.jpg');
});

it('validates avatar file type', function () {
    Storage::fake('public');
    
    $user = User::factory()->create();
    
    $file = UploadedFile::fake()->create('document.pdf', 100);
    
    $response = $this->actingAs($user)->patch(route('profile.update'), [
        'name' => $user->name,
        'email' => $user->email,
        'avatar' => $file,
    ]);
    
    $response->assertSessionHasErrors('avatar');
});

it('validates avatar file size', function () {
    Storage::fake('public');
    
    $user = User::factory()->create();
    
    // Create a file larger than 2MB
    $file = UploadedFile::fake()->image('large-avatar.jpg')->size(3000);
    
    $response = $this->actingAs($user)->patch(route('profile.update'), [
        'name' => $user->name,
        'email' => $user->email,
        'avatar' => $file,
    ]);
    
    $response->assertSessionHasErrors('avatar');
});

it('can update profile without changing avatar', function () {
    Storage::fake('public');
    
    $user = User::factory()->create([
        'avatar' => 'avatars/existing-avatar.jpg',
    ]);
    
    Storage::disk('public')->put('avatars/existing-avatar.jpg', 'content');
    
    $response = $this->actingAs($user)->patch(route('profile.update'), [
        'name' => 'Updated Name',
        'email' => $user->email,
    ]);
    
    $response->assertRedirect(route('profile.edit'));
    
    $user->refresh();
    
    expect($user->name)->toBe('Updated Name');
    expect($user->avatar)->toBe('avatars/existing-avatar.jpg');
    expect(Storage::disk('public')->exists('avatars/existing-avatar.jpg'))->toBeTrue();
});

it('deletes avatar when user account is deleted', function () {
    Storage::fake('public');
    
    $user = User::factory()->create([
        'avatar' => 'avatars/user-avatar.jpg',
    ]);
    
    Storage::disk('public')->put('avatars/user-avatar.jpg', 'content');
    
    $response = $this->actingAs($user)->delete(route('profile.destroy'), [
        'password' => 'password',
    ]);
    
    $response->assertRedirect('/');
    
    // Avatar should be deleted
    expect(Storage::disk('public')->exists('avatars/user-avatar.jpg'))->toBeFalse();
    
    // User should be deleted
    expect(User::find($user->id))->toBeNull();
});

it('accepts various image formats', function ($mimeType, $extension) {
    Storage::fake('public');
    
    $user = User::factory()->create();
    
    $file = UploadedFile::fake()->image("avatar.{$extension}");
    
    $response = $this->actingAs($user)->patch(route('profile.update'), [
        'name' => $user->name,
        'email' => $user->email,
        'avatar' => $file,
    ]);
    
    $response->assertRedirect(route('profile.edit'));
    
    $user->refresh();
    
    expect($user->avatar)->not->toBeNull();
    expect(Storage::disk('public')->exists($user->avatar))->toBeTrue();
})->with([
    ['image/jpeg', 'jpg'],
    ['image/jpeg', 'jpeg'],
    ['image/png', 'png'],
    ['image/gif', 'gif'],
]);
