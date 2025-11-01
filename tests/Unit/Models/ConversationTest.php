<?php

declare(strict_types=1);

use App\Models\Chat\Conversation;

it('has correct fillable attributes defined', function () {
    $conversation = new Conversation();
    $fillable = $conversation->getFillable();
    
    expect($fillable)->toContain('user_id1', 'user_id2', 'last_message_id');
});

it('has correct table name', function () {
    $conversation = new Conversation();
    
    expect($conversation->getTable())->toBe('conversations');
});
