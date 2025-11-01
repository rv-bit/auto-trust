<?php

declare(strict_types=1);

use App\Http\Resources\Vehicles\VehicleModelResource;
use App\Models\Vehicles\VehicleMake;
use App\Models\Vehicles\VehicleModel;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('transforms vehicle model to array', function () {
    $make = VehicleMake::factory()->create();
    $model = VehicleModel::factory()->create([
        'make_id' => $make->id,
        'name' => 'Camry',
        'slug' => 'camry',
    ]);
    
    $resource = new VehicleModelResource($model);
    $array = $resource->toArray(request());
    
    expect($array)->toHaveKeys(['id', 'make_id', 'name', 'slug']);
    expect($array['make_id'])->toBe($make->id);
    expect($array['name'])->toBe('Camry');
    expect($array['slug'])->toBe('camry');
});
