<?php

declare(strict_types=1);

use App\Models\Chat\MessageAttachment;

it('has correct fillable attributes defined', function () {
    $attachment = new MessageAttachment();
    $fillable = $attachment->getFillable();
    
    expect($fillable)->toContain('message_id', 'name', 'path', 'mime', 'size');
});

it('has correct table name', function () {
    $attachment = new MessageAttachment();
    
    expect($attachment->getTable())->toBe('message_attachments');
});
