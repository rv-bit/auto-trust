<?php

declare(strict_types=1);

use App\Enum\RolesEnum;

it('has correct role values', function () {
    expect(RolesEnum::Admin->value)->toBe('admin');
    expect(RolesEnum::User->value)->toBe('user');
});

it('returns correct labels array', function () {
    $labels = RolesEnum::labels();
    
    expect($labels)->toBeArray();
    expect($labels['admin'])->toBe('Admin');
    expect($labels['user'])->toBe('User');
});

it('returns correct individual label', function () {
    expect(RolesEnum::Admin->label())->toBe('Admin');
    expect(RolesEnum::User->label())->toBe('User');
});
