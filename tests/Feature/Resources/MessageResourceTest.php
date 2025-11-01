<?php

declare(strict_types=1);

use App\Http\Resources\Chat\MessageResource;
use App\Models\Chat\Message;
use App\Models\Chat\Conversation;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('transforms message to array', function () {
    $sender = User::factory()->create(['name' => 'John Doe']);
    $receiver = User::factory()->create(['name' => 'Jane Doe']);
    
    $conversation = Conversation::create([
        'user_id1' => $sender->id,
        'user_id2' => $receiver->id,
    ]);
    
    $message = Message::create([
        'conversation_id' => $conversation->id,
        'sender_id' => $sender->id,
        'receiver_id' => $receiver->id,
        'message' => 'Hello, this is a test message',
    ]);
    
    $resource = new MessageResource($message);
    $array = $resource->toArray(request());
    
    expect($array)->toHaveKeys([
        'id',
        'message',
        'sender_id',
        'receiver_id',
        'sender',
        'attachments',
        'created_at',
        'seen_at',
        'updated_at'
    ]);
    expect($array['message'])->toBe('Hello, this is a test message');
    expect($array['sender_id'])->toBe($sender->id);
    expect($array['receiver_id'])->toBe($receiver->id);
    expect($array['sender'])->toBeInstanceOf(\App\Http\Resources\User\UserResource::class);
    expect($array['attachments'])->toBeInstanceOf(\Illuminate\Http\Resources\Json\AnonymousResourceCollection::class);
    expect($array['seen_at'])->toBeNull();
});

it('includes seen_at when message is read', function () {
    $sender = User::factory()->create();
    $receiver = User::factory()->create();
    
    $conversation = Conversation::create([
        'user_id1' => $sender->id,
        'user_id2' => $receiver->id,
    ]);
    
    $seenAt = now();
    $message = Message::create([
        'conversation_id' => $conversation->id,
        'sender_id' => $sender->id,
        'receiver_id' => $receiver->id,
        'message' => 'Read message',
    ]);
    
    // Use DB to update seen_at since it's not fillable
    \DB::table('messages')->where('id', $message->id)->update(['seen_at' => $seenAt]);
    $message->refresh();
    
    $resource = new MessageResource($message);
    $array = $resource->toArray(request());
    
    expect($array['seen_at'])->not->toBeNull();
    expect($array['seen_at'])->toBeInstanceOf(\Illuminate\Support\Carbon::class);
});
