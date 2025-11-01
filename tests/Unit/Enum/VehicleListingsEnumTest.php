<?php

declare(strict_types=1);

use App\Enum\VehicleListingsEnum;

it('has correct vehicle listing values', function () {
    expect(VehicleListingsEnum::Used->value)->toBe('used-cars');
    expect(VehicleListingsEnum::New->value)->toBe('new-cars');
});

it('returns correct labels array', function () {
    $labels = VehicleListingsEnum::labels();
    
    expect($labels)->toBeArray();
    expect($labels['used-cars'])->toBe('Used');
    expect($labels['new-cars'])->toBe('New');
});

it('returns correct individual label', function () {
    expect(VehicleListingsEnum::Used->label())->toBe('Used');
    expect(VehicleListingsEnum::New->label())->toBe('New');
});
