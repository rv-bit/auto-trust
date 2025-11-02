<?php

declare(strict_types=1);

use App\Models\User;
use App\Models\Vehicles\Vehicle;
use Illuminate\Foundation\Testing\RefreshDatabase;
use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;
use function Pest\Laravel\post;
use function Pest\Laravel\put;
use function Pest\Laravel\delete;

uses(RefreshDatabase::class);

it('lists vehicles with filters', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    actingAs($user);
    Vehicle::factory()->count(3)->create();
    $response = get('/api/vehicles?per_page=1');
    $response->assertOk();
    $response->assertJsonStructure(['data']);
});

it('creates a vehicle', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    actingAs($user);
    $vehicleData = Vehicle::factory()->make([
        'color' => 'black',
        'gearbox' => 'manual',
        'body_style' => 'suv',
        'fuel_type' => 'petrol',
    ])->toArray();
    
    // Remove images from factory data as it's optional
    unset($vehicleData['images']);
    
    $response = post('/api/vehicles', $vehicleData);
    $response->assertCreated();
    $response->assertJsonFragment(['color' => 'black']);
});

it('shows a vehicle', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    actingAs($user);
    $vehicle = Vehicle::factory()->create();
    $response = get('/api/vehicles/' . $vehicle->id);
    $response->assertOk();
    $response->assertJsonFragment(['id' => $vehicle->id]);
});

it('updates a vehicle', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    actingAs($user);
    $vehicle = Vehicle::factory()->create(['seller_id' => $user->id]);
    $update = ['color' => 'blue'];
    $response = put('/api/vehicles/' . $vehicle->id, $update);
    $response->assertOk();
    $response->assertJsonFragment(['color' => 'blue']);
});

it('deletes a vehicle', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    actingAs($user);
    $vehicle = Vehicle::factory()->create(['seller_id' => $user->id]);
    $response = delete('/api/vehicles/' . $vehicle->id);
    $response->assertNoContent();
    $this->assertSoftDeleted('vehicles', ['id' => $vehicle->id]);
});

it('searches vehicles', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    actingAs($user);
    Vehicle::factory()->count(2)->create(['color' => 'blue', 'status' => 'active']);
    $response = get('/api/vehicles/search?color=blue');
    $response->assertOk();
    expect($response->json('data'))->toHaveCount(2);
});

it('filters vehicles by make', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    actingAs($user);
    $make = \App\Models\Vehicles\VehicleMake::factory()->create(['slug' => 'test-make']);
    Vehicle::factory()->create(['make_id' => $make->id, 'status' => 'active']);
    $response = get('/api/vehicles?make=test-make');
    $response->assertOk();
});

it('filters vehicles by model', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    actingAs($user);
    $model = \App\Models\Vehicles\VehicleModel::factory()->create(['slug' => 'test-model']);
    Vehicle::factory()->create(['model_id' => $model->id, 'status' => 'active']);
    $response = get('/api/vehicles?model=test-model');
    $response->assertOk();
});

it('filters vehicles by body style', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    actingAs($user);
    Vehicle::factory()->create(['body_style' => 'suv', 'status' => 'active']);
    $response = get('/api/vehicles?bodyStyle[]=suv');
    $response->assertOk();
});

it('filters vehicles by fuel type', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    actingAs($user);
    Vehicle::factory()->create(['fuel_type' => 'electric', 'status' => 'active']);
    $response = get('/api/vehicles?fuelType[]=electric');
    $response->assertOk();
});

it('filters vehicles by gearbox', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    actingAs($user);
    Vehicle::factory()->create(['gearbox' => 'manual', 'status' => 'active']);
    $response = get('/api/vehicles?gearbox[]=manual');
    $response->assertOk();
});

it('filters vehicles by color', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    actingAs($user);
    Vehicle::factory()->create(['color' => 'black', 'status' => 'active']);
    $response = get('/api/vehicles?color[]=black');
    $response->assertOk();
});

it('filters vehicles by price range', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    actingAs($user);
    Vehicle::factory()->create(['price' => 20000, 'status' => 'active']);
    $response = get('/api/vehicles?price[min]=10000&price[max]=30000');
    $response->assertOk();
});

it('filters vehicles by year range', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    actingAs($user);
    Vehicle::factory()->create(['year' => 2020, 'status' => 'active']);
    $response = get('/api/vehicles?year[from]=2019&year[to]=2021');
    $response->assertOk();
});

it('filters vehicles by mileage range', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    actingAs($user);
    Vehicle::factory()->create(['mileage' => 50000, 'status' => 'active']);
    $response = get('/api/vehicles?mileage[min]=40000&mileage[max]=60000');
    $response->assertOk();
});

it('filters vehicles by postcode', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    actingAs($user);
    Vehicle::factory()->create(['postcode' => 'SW1A 1AA', 'status' => 'active']);
    $response = get('/api/vehicles?postcode=SW1A');
    $response->assertOk();
});

it('filters vehicles by safety rating', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    actingAs($user);
    Vehicle::factory()->create(['safety_rating' => 5, 'status' => 'active']);
    $response = get('/api/vehicles?safetyRating=4_star_up');
    $response->assertOk();
});
