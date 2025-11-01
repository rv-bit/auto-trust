<?php

declare(strict_types=1);

use App\Models\Vehicles\VehicleMake;

it('has correct fillable attributes defined', function () {
    $make = new VehicleMake();
    $fillable = $make->getFillable();
    
    expect($fillable)->toContain('name', 'slug', 'logo_url');
});

it('has correct table name', function () {
    $make = new VehicleMake();
    
    expect($make->getTable())->toBe('vehicle_makes');
});
