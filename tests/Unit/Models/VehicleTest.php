<?php

declare(strict_types=1);

use App\Models\Vehicles\Vehicle;

it('has correct fillable attributes defined', function () {
    $vehicle = new Vehicle();
    $fillable = $vehicle->getFillable();
    
    expect($fillable)->toContain(
        'make_id',
        'model_id',
        'seller_id',
        'body_style',
        'fuel_type',
        'gearbox',
        'color',
        'year',
        'mileage',
        'price',
        'doors',
        'seats',
        'status'
    );
});

it('has correct casts defined', function () {
    $vehicle = new Vehicle();
    $casts = $vehicle->getCasts();
    
    expect($casts)->toHaveKey('extras');
    expect($casts['extras'])->toBe('json');
    expect($casts)->toHaveKey('specification');
    expect($casts['specification'])->toBe('json');
    expect($casts)->toHaveKey('year');
    expect($casts['year'])->toBe('integer');
    expect($casts)->toHaveKey('price');
    expect($casts['price'])->toBe('integer');
    expect($casts)->toHaveKey('latitude');
    expect($casts['latitude'])->toBe('float');
    expect($casts)->toHaveKey('longitude');
    expect($casts['longitude'])->toBe('float');
});

it('has correct hidden attributes defined', function () {
    $vehicle = new Vehicle();
    $hidden = $vehicle->getHidden();
    
    expect($hidden)->toContain('deleted_at');
});

it('has correct table name', function () {
    $vehicle = new Vehicle();
    
    expect($vehicle->getTable())->toBe('vehicles');
});

it('uses soft deletes', function () {
    $vehicle = new Vehicle();
    
    expect(method_exists($vehicle, 'trashed'))->toBeTrue();
    expect(method_exists($vehicle, 'restore'))->toBeTrue();
    expect(method_exists($vehicle, 'forceDelete'))->toBeTrue();
});
