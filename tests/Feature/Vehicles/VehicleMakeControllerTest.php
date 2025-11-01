<?php

declare(strict_types=1);

use App\Models\User;
use App\Models\Vehicles\VehicleMake;
use Illuminate\Foundation\Testing\RefreshDatabase;
use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;

uses(RefreshDatabase::class);

it('lists all vehicle makes', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    actingAs($user);
    
    VehicleMake::factory()->count(3)->create();
    
    $response = get('/api/vehicles/makes');
    $response->assertOk();
    $response->assertJsonCount(3);
});

it('shows a vehicle make with models', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    actingAs($user);
    
    $make = VehicleMake::factory()->create();
    \App\Models\Vehicles\VehicleModel::create([
        'make_id' => $make->id,
        'name' => 'Model 1',
        'slug' => 'model-1',
    ]);
    \App\Models\Vehicles\VehicleModel::create([
        'make_id' => $make->id,
        'name' => 'Model 2',
        'slug' => 'model-2',
    ]);
    
    $response = get("/api/vehicles/makes/{$make->id}");
    $response->assertOk();
    $response->assertJsonStructure(['id', 'name', 'models']);
    expect($response->json('models'))->toHaveCount(2);
});
