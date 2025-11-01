<?php

declare(strict_types=1);

use App\Models\Chat\Message;

it('has correct fillable attributes defined', function () {
    $message = new Message();
    $fillable = $message->getFillable();
    
    expect($fillable)->toContain('message', 'sender_id', 'receiver_id');
});

it('has correct table name', function () {
    $message = new Message();
    
    expect($message->getTable())->toBe('messages');
});

it('has correct casts defined', function () {
    $message = new Message();
    $casts = $message->getCasts();
    
    expect($casts)->toHaveKey('seen_at');
    expect($casts['seen_at'])->toBe('datetime');
});
