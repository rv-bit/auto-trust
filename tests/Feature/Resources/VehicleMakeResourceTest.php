<?php

declare(strict_types=1);

use App\Http\Resources\Vehicles\VehicleMakeResource;
use App\Models\Vehicles\VehicleMake;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('transforms vehicle make to array', function () {
    $make = VehicleMake::factory()->create([
        'name' => 'Toyota',
        'slug' => 'toyota',
        'logo_url' => 'https://example.com/toyota.png',
    ]);
    
    $resource = new VehicleMakeResource($make);
    $array = $resource->toArray(request());
    
    expect($array)->toHaveKeys(['id', 'name', 'slug', 'logo_url']);
    expect($array['name'])->toBe('Toyota');
    expect($array['slug'])->toBe('toyota');
    expect($array['logo_url'])->toBe('https://example.com/toyota.png');
});
