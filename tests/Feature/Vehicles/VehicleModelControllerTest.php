<?php

declare(strict_types=1);

use App\Models\User;
use App\Models\Vehicles\VehicleMake;
use App\Models\Vehicles\VehicleModel;
use Illuminate\Foundation\Testing\RefreshDatabase;
use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;

uses(RefreshDatabase::class);

it('lists models for a specific make', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    actingAs($user);
    
    $make = VehicleMake::factory()->create();
    VehicleModel::factory()->count(3)->create(['make_id' => $make->id]);
    
    $response = get("/api/vehicles/makes/{$make->id}/models");
    $response->assertOk();
    $response->assertJsonCount(3);
});

it('lists all vehicle models', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    actingAs($user);
    
    VehicleModel::factory()->count(5)->create();
    
    $response = get('/api/vehicles/models');
    $response->assertOk();
    $response->assertJsonCount(5);
});
