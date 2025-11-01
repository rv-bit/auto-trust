<?php

declare(strict_types=1);

use App\Models\User;

it('has correct fillable attributes defined', function () {
    $user = new User();
    $fillable = $user->getFillable();
    
    expect($fillable)->toContain('name', 'email', 'password', 'is_admin');
});

it('has correct hidden attributes defined', function () {
    $user = new User();
    $hidden = $user->getHidden();
    
    expect($hidden)->toContain('password', 'two_factor_secret', 'two_factor_recovery_codes', 'remember_token');
});

it('has correct table name', function () {
    $user = new User();
    
    expect($user->getTable())->toBe('users');
});

it('uses correct primary key', function () {
    $user = new User();
    
    expect($user->getKeyName())->toBe('id');
    expect($user->getIncrementing())->toBeTrue();
});
