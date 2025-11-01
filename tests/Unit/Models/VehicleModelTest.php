<?php

declare(strict_types=1);

use App\Models\Vehicles\VehicleModel;

it('has correct fillable attributes defined', function () {
    $model = new VehicleModel();
    $fillable = $model->getFillable();
    
    expect($fillable)->toContain('make_id', 'name', 'slug');
});

it('has correct table name', function () {
    $model = new VehicleModel();
    
    expect($model->getTable())->toBe('vehicle_models');
});
