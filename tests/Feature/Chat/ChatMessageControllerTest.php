<?php

declare(strict_types=1);

use App\Models\User;
use App\Models\Chat\Message;
use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;
use function Pest\Laravel\post;

it('shows chat messages for authenticated user', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    // Optionally create a conversation or message if required by Inertia page
    actingAs($user);
    $response = get('/chat');
    $response->assertOk();
});

it('blocks unauthenticated user from chat', function () {
    $response = get('/chat');
    $response->assertRedirect('/login');
});

it('can send a chat message', function () {
    $sender = User::factory()->create(['email_verified_at' => now()]);
    $receiver = User::factory()->create(['email_verified_at' => now()]);
    actingAs($sender);
    $payload = [
        'message' => 'Hello world',
        'receiver_id' => $receiver->id,
    ];
    $response = post('/chat/message', $payload);
        $response->assertStatus(201);
    $response->assertJsonFragment(['message' => 'Hello world']);
});

it('validates message sending', function () {
    $sender = User::factory()->create(['email_verified_at' => now()]);
    actingAs($sender);
    $payload = [
        'receiver_id' => $sender->id,
    ];
    $response = post('/chat/message', $payload);
    $response->assertSessionHasErrors(['message']);
});

it('can load older messages', function () {
    $sender = User::factory()->create(['email_verified_at' => now()]);
    $receiver = User::factory()->create(['email_verified_at' => now()]);
    actingAs($sender);
    $msg = Message::create([
        'message' => 'Oldest',
        'sender_id' => $sender->id,
        'receiver_id' => $receiver->id,
    ]);
    $response = get("/chat/message/older/{$msg->id}");
        $response->assertStatus(200);
});

it('can delete own message', function () {
    $sender = User::factory()->create(['email_verified_at' => now()]);
    $receiver = User::factory()->create(['email_verified_at' => now()]);
    actingAs($sender);
    $msg = Message::create([
        'message' => 'To delete',
        'sender_id' => $sender->id,
        'receiver_id' => $receiver->id,
    ]);
    $response = \Pest\Laravel\delete("/chat/message/{$msg->id}");
    $response->assertOk();
});

it('cannot delete another user\'s message', function () {
    $sender = User::factory()->create(['email_verified_at' => now()]);
    $receiver = User::factory()->create(['email_verified_at' => now()]);
    $other = User::factory()->create(['email_verified_at' => now()]);
    $msg = Message::create([
        'message' => 'Not yours',
        'sender_id' => $sender->id,
        'receiver_id' => $receiver->id,
    ]);
    actingAs($other);
    $response = \Pest\Laravel\delete("/chat/message/{$msg->id}");
    $response->assertForbidden();
});

it('can mark conversation as seen', function () {
    $sender = User::factory()->create(['email_verified_at' => now()]);
    $receiver = User::factory()->create(['email_verified_at' => now()]);
    $msg = Message::create([
        'message' => 'See me',
        'sender_id' => $sender->id,
        'receiver_id' => $receiver->id,
    ]);
    actingAs($receiver);
    $response = post("/chat/message/seen/{$sender->id}");
    $response->assertOk();
    $msg->refresh();
    // seen_at should be set
    expect($msg->seen_at)->not->toBeNull();
});
