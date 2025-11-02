<?php

declare(strict_types=1);

use App\Enum\VehicleConditionEnum;

it('has correct vehicle listing values', function () {
    expect(VehicleConditionEnum::Used->value)->toBe('used');
    expect(VehicleConditionEnum::New->value)->toBe('new');
    expect(VehicleConditionEnum::NearlyNew->value)->toBe('nearly-new');
});

it('returns correct labels array', function () {
    $labels = VehicleConditionEnum::labels();
    
    expect($labels)->toBeArray();
    expect($labels['used'])->toBe('Used');
    expect($labels['new'])->toBe('New');
    expect($labels['nearly-new'])->toBe('Nearly New');
});

it('returns correct individual label', function () {
    expect(VehicleConditionEnum::Used->label())->toBe('Used');
    expect(VehicleConditionEnum::New->label())->toBe('New');
    expect(VehicleConditionEnum::NearlyNew->label())->toBe('Nearly New');
});
