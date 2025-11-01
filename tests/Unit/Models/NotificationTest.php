<?php

declare(strict_types=1);

use App\Models\Notification;

it('has correct fillable attributes defined', function () {
    $notification = new Notification();
    $fillable = $notification->getFillable();
    
    expect($fillable)->toContain('id', 'type', 'notifiable_type', 'notifiable_id', 'data', 'read_at');
});

it('uses string as primary key type', function () {
    $notification = new Notification();
    
    expect($notification->getKeyType())->toBe('string');
    expect($notification->getIncrementing())->toBeFalse();
});

it('has correct casts defined', function () {
    $notification = new Notification();
    $casts = $notification->getCasts();
    
    expect($casts)->toHaveKey('data');
    expect($casts['data'])->toBe('array');
    expect($casts)->toHaveKey('read_at');
    expect($casts['read_at'])->toBe('datetime');
});

it('has correct table name', function () {
    $notification = new Notification();
    
    expect($notification->getTable())->toBe('notifications');
});
