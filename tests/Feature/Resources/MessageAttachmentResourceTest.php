<?php

declare(strict_types=1);

use App\Http\Resources\Chat\MessageAttachmentResource;
use App\Models\Chat\MessageAttachment;
use App\Models\Chat\Message;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;

uses(RefreshDatabase::class);

it('transforms message attachment to array', function () {
    Storage::fake('local');
    
    $user = User::factory()->create();
    $user2 = User::factory()->create();
    
    $conversation = \App\Models\Chat\Conversation::create([
        'user_id1' => $user->id,
        'user_id2' => $user2->id,
    ]);
    
    $message = Message::create([
        'conversation_id' => $conversation->id,
        'sender_id' => $user->id,
        'receiver_id' => $user2->id,
        'message' => 'Test message',
    ]);
    
    $attachment = MessageAttachment::create([
        'message_id' => $message->id,
        'name' => 'test-file.pdf',
        'path' => 'attachments/test-file.pdf',
        'mime' => 'application/pdf',
        'size' => 1024,
    ]);
    
    $resource = new MessageAttachmentResource($attachment);
    $array = $resource->toArray(request());
    
    expect($array)->toHaveKeys(['id', 'message_id', 'name', 'mime', 'size', 'url', 'created_at', 'updated_at']);
    expect($array['name'])->toBe('test-file.pdf');
    expect($array['mime'])->toBe('application/pdf');
    expect($array['size'])->toBe(1024);
    expect($array['url'])->toBeString();
})->skip('Storage facade configuration issue with S3');

