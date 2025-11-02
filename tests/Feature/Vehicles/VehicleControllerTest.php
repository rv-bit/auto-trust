<?php

declare(strict_types=1);

use App\Models\User;
use App\Models\Vehicles\Vehicle;
use App\Models\Vehicles\VehicleMake;
use App\Models\Vehicles\VehicleModel;
use App\Services\GeocodeService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;
use function Pest\Laravel\post;
use function Pest\Laravel\put;
use function Pest\Laravel\delete;

it('shows vehicles dashboard for authenticated user', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    actingAs($user);
    $response = get('/vehicles/dashboard');
    $response->assertOk();
});

it('blocks unauthenticated user from vehicles dashboard', function () {
    $response = get('/vehicles/dashboard');
    $response->assertRedirect('/login');
});

it('can list all vehicles', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    $make = VehicleMake::factory()->create();
    $model = VehicleModel::factory()->create(['make_id' => $make->id]);
    
    Vehicle::factory()->count(3)->create([
        'make_id' => $make->id,
        'model_id' => $model->id,
        'status' => 'active',
    ]);

    actingAs($user);
    $response = get('/api/vehicles');
    
    $response->assertOk();
    $response->assertJsonCount(3, 'data');
});

it('can filter vehicles by make', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    $make1 = VehicleMake::factory()->create(['slug' => 'toyota']);
    $make2 = VehicleMake::factory()->create(['slug' => 'honda']);
    $model1 = VehicleModel::factory()->create(['make_id' => $make1->id]);
    $model2 = VehicleModel::factory()->create(['make_id' => $make2->id]);
    
    Vehicle::factory()->count(2)->create([
        'make_id' => $make1->id,
        'model_id' => $model1->id,
        'status' => 'active',
    ]);
    
    Vehicle::factory()->create([
        'make_id' => $make2->id,
        'model_id' => $model2->id,
        'status' => 'active',
    ]);

    actingAs($user);
    $response = get('/api/vehicles?make=toyota');
    
    $response->assertOk();
    $response->assertJsonCount(2, 'data');
});

it('can filter vehicles by model', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    $make = VehicleMake::factory()->create();
    $model1 = VehicleModel::factory()->create(['make_id' => $make->id, 'slug' => 'camry']);
    $model2 = VehicleModel::factory()->create(['make_id' => $make->id, 'slug' => 'corolla']);
    
    Vehicle::factory()->count(2)->create([
        'make_id' => $make->id,
        'model_id' => $model1->id,
        'status' => 'active',
    ]);
    
    Vehicle::factory()->create([
        'make_id' => $make->id,
        'model_id' => $model2->id,
        'status' => 'active',
    ]);

    actingAs($user);
    $response = get('/api/vehicles?model=camry');
    
    $response->assertOk();
    $response->assertJsonCount(2, 'data');
});

it('can filter vehicles by body style', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    $make = VehicleMake::factory()->create();
    $model = VehicleModel::factory()->create(['make_id' => $make->id]);
    
    Vehicle::factory()->count(2)->create([
        'make_id' => $make->id,
        'model_id' => $model->id,
        'body_style' => 'saloon',
        'status' => 'active',
    ]);
    
    Vehicle::factory()->create([
        'make_id' => $make->id,
        'model_id' => $model->id,
        'body_style' => 'suv',
        'status' => 'active',
    ]);

    actingAs($user);
    $response = get('/api/vehicles?bodyStyle[]=saloon');
    
    $response->assertOk();
    $response->assertJsonCount(2, 'data');
});

it('can filter vehicles by fuel type', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    $make = VehicleMake::factory()->create();
    $model = VehicleModel::factory()->create(['make_id' => $make->id]);
    
    Vehicle::factory()->count(2)->create([
        'make_id' => $make->id,
        'model_id' => $model->id,
        'fuel_type' => 'petrol',
        'status' => 'active',
    ]);
    
    Vehicle::factory()->create([
        'make_id' => $make->id,
        'model_id' => $model->id,
        'fuel_type' => 'diesel',
        'status' => 'active',
    ]);

    actingAs($user);
    $response = get('/api/vehicles?fuelType[]=petrol');
    
    $response->assertOk();
    $response->assertJsonCount(2, 'data');
});

it('can filter vehicles by gearbox', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    $make = VehicleMake::factory()->create();
    $model = VehicleModel::factory()->create(['make_id' => $make->id]);
    
    Vehicle::factory()->count(2)->create([
        'make_id' => $make->id,
        'model_id' => $model->id,
        'gearbox' => 'automatic',
        'status' => 'active',
    ]);

    actingAs($user);
    $response = get('/api/vehicles?gearbox[]=automatic');
    
    $response->assertOk();
    $response->assertJsonCount(2, 'data');
});

it('can filter vehicles by color', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    $make = VehicleMake::factory()->create();
    $model = VehicleModel::factory()->create(['make_id' => $make->id]);
    
    Vehicle::factory()->count(2)->create([
        'make_id' => $make->id,
        'model_id' => $model->id,
        'color' => 'black',
        'status' => 'active',
    ]);

    actingAs($user);
    $response = get('/api/vehicles?color[]=black');
    
    $response->assertOk();
    $response->assertJsonCount(2, 'data');
});

it('can filter vehicles by condition', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    $make = VehicleMake::factory()->create();
    $model = VehicleModel::factory()->create(['make_id' => $make->id]);
    
    Vehicle::factory()->count(2)->create([
        'make_id' => $make->id,
        'model_id' => $model->id,
        'year' => now()->year,
        'status' => 'active',
    ]);

    actingAs($user);
    $response = get('/api/vehicles?vehicleAge=new');
    
    $response->assertOk();
});

it('can filter vehicles by price range', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    $make = VehicleMake::factory()->create();
    $model = VehicleModel::factory()->create(['make_id' => $make->id]);
    
    Vehicle::factory()->create([
        'make_id' => $make->id,
        'model_id' => $model->id,
        'price' => 15000,
        'status' => 'active',
    ]);
    
    Vehicle::factory()->create([
        'make_id' => $make->id,
        'model_id' => $model->id,
        'price' => 25000,
        'status' => 'active',
    ]);

    actingAs($user);
    $response = get('/api/vehicles?price[min]=10000&price[max]=20000');
    
    $response->assertOk();
    $response->assertJsonCount(1, 'data');
});

it('can filter vehicles by price range using legacy format', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    $make = VehicleMake::factory()->create();
    $model = VehicleModel::factory()->create(['make_id' => $make->id]);
    
    Vehicle::factory()->create([
        'make_id' => $make->id,
        'model_id' => $model->id,
        'price' => 15000,
        'status' => 'active',
    ]);

    actingAs($user);
    $response = get('/api/vehicles?priceMin=10000&priceMax=20000');
    
    $response->assertOk();
    $response->assertJsonCount(1, 'data');
});

it('can filter vehicles by year range', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    $make = VehicleMake::factory()->create();
    $model = VehicleModel::factory()->create(['make_id' => $make->id]);
    
    Vehicle::factory()->create([
        'make_id' => $make->id,
        'model_id' => $model->id,
        'year' => 2020,
        'status' => 'active',
    ]);
    
    Vehicle::factory()->create([
        'make_id' => $make->id,
        'model_id' => $model->id,
        'year' => 2015,
        'status' => 'active',
    ]);

    actingAs($user);
    $response = get('/api/vehicles?year[from]=2018&year[to]=2023');
    
    $response->assertOk();
    $response->assertJsonCount(1, 'data');
});

it('can filter vehicles by year range using legacy format', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    $make = VehicleMake::factory()->create();
    $model = VehicleModel::factory()->create(['make_id' => $make->id]);
    
    Vehicle::factory()->create([
        'make_id' => $make->id,
        'model_id' => $model->id,
        'year' => 2020,
        'status' => 'active',
    ]);

    actingAs($user);
    $response = get('/api/vehicles?yearFrom=2018&yearTo=2023');
    
    $response->assertOk();
    $response->assertJsonCount(1, 'data');
});

it('can filter vehicles by mileage range', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    $make = VehicleMake::factory()->create();
    $model = VehicleModel::factory()->create(['make_id' => $make->id]);
    
    Vehicle::factory()->create([
        'make_id' => $make->id,
        'model_id' => $model->id,
        'mileage' => 50000,
        'status' => 'active',
    ]);
    
    Vehicle::factory()->create([
        'make_id' => $make->id,
        'model_id' => $model->id,
        'mileage' => 100000,
        'status' => 'active',
    ]);

    actingAs($user);
    $response = get('/api/vehicles?mileage[min]=0&mileage[max]=60000');
    
    $response->assertOk();
    $response->assertJsonCount(1, 'data');
});

it('can filter vehicles by mileage range using legacy format', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    $make = VehicleMake::factory()->create();
    $model = VehicleModel::factory()->create(['make_id' => $make->id]);
    
    Vehicle::factory()->create([
        'make_id' => $make->id,
        'model_id' => $model->id,
        'mileage' => 50000,
        'status' => 'active',
    ]);

    actingAs($user);
    $response = get('/api/vehicles?mileageMin=0&mileageMax=60000');
    
    $response->assertOk();
    $response->assertJsonCount(1, 'data');
});

it('can filter vehicles by safety rating', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    $make = VehicleMake::factory()->create();
    $model = VehicleModel::factory()->create(['make_id' => $make->id]);
    
    Vehicle::factory()->count(2)->create([
        'make_id' => $make->id,
        'model_id' => $model->id,
        'safety_rating' => 5,
        'status' => 'active',
    ]);
    
    Vehicle::factory()->create([
        'make_id' => $make->id,
        'model_id' => $model->id,
        'safety_rating' => 3,
        'status' => 'active',
    ]);

    actingAs($user);
    $response = get('/api/vehicles?safetyRating=4_star_up');
    
    $response->assertOk();
    $response->assertJsonCount(2, 'data');
});

it('can filter vehicles by specification', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    $make = VehicleMake::factory()->create();
    $model = VehicleModel::factory()->create(['make_id' => $make->id]);
    
    Vehicle::factory()->create([
        'make_id' => $make->id,
        'model_id' => $model->id,
        'specification' => ['abs' => true, 'airbags' => true],
        'status' => 'active',
    ]);

    actingAs($user);
    $response = get('/api/vehicles?specification[abs]=true');
    
    $response->assertOk();
    $response->assertJsonCount(1, 'data');
});

it('can filter vehicles by extras', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    $make = VehicleMake::factory()->create();
    $model = VehicleModel::factory()->create(['make_id' => $make->id]);
    
    Vehicle::factory()->create([
        'make_id' => $make->id,
        'model_id' => $model->id,
        'extras' => ['sunroof' => true, 'leather_seats' => true],
        'status' => 'active',
    ]);

    actingAs($user);
    $response = get('/api/vehicles?extras[sunroof]=true');
    
    $response->assertOk();
    $response->assertJsonCount(1, 'data');
});

it('can create a new vehicle', function () {
    Storage::fake('public');
    
    $user = User::factory()->create(['email_verified_at' => now()]);
    $make = VehicleMake::factory()->create();
    $model = VehicleModel::factory()->create(['make_id' => $make->id]);

    actingAs($user);
    
    $response = post('/api/vehicles', [
        'make_id' => $make->id,
        'model_id' => $model->id,
        'year' => 2020,
        'price' => 25000,
        'mileage' => 50000,
        'body_style' => 'saloon',
        'fuel_type' => 'petrol',
        'gearbox' => 'automatic',
        'color' => 'black',
        'doors' => 4,
        'seats' => 5,
        'postcode' => 'SW1A 1AA',
        'description' => 'Test vehicle',
        'images' => [
            UploadedFile::fake()->image('car1.jpg'),
            UploadedFile::fake()->image('car2.jpg'),
        ],
    ]);
    
    $response->assertStatus(201);
    $response->assertJsonPath('seller_id', $user->id);
    
    Storage::disk('public')->assertExists('vehicles/');
});

it('can show a specific vehicle', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    $make = VehicleMake::factory()->create();
    $model = VehicleModel::factory()->create(['make_id' => $make->id]);
    $vehicle = Vehicle::factory()->create([
        'make_id' => $make->id,
        'model_id' => $model->id,
    ]);

    actingAs($user);
    $response = get("/api/vehicles/{$vehicle->id}");
    
    $response->assertOk();
    expect($response->json('id'))->toBe($vehicle->id);
});

it('can update a vehicle', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    $make = VehicleMake::factory()->create();
    $model = VehicleModel::factory()->create(['make_id' => $make->id]);
    $vehicle = Vehicle::factory()->create([
        'make_id' => $make->id,
        'model_id' => $model->id,
        'seller_id' => $user->id,
        'price' => 20000,
    ]);

    actingAs($user);
    $response = put("/api/vehicles/{$vehicle->id}", [
        'price' => 22000,
    ]);
    
    $response->assertOk();
    $response->assertJsonPath('price', 22000);
});

it('can delete a vehicle', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    $make = VehicleMake::factory()->create();
    $model = VehicleModel::factory()->create(['make_id' => $make->id]);
    $vehicle = Vehicle::factory()->create([
        'make_id' => $make->id,
        'model_id' => $model->id,
        'seller_id' => $user->id,
    ]);

    actingAs($user);
    $response = delete("/api/vehicles/{$vehicle->id}");
    
    $response->assertStatus(204);
    expect(Vehicle::find($vehicle->id))->toBeNull();
});

it('can geocode a valid postcode', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    
    $geocodeService = Mockery::mock(GeocodeService::class);
    $geocodeService->shouldReceive('getCoordinatesFromPostcode')
        ->with('SW1A1AA')
        ->once()
        ->andReturn([
            'latitude' => 51.5014,
            'longitude' => -0.1419,
        ]);
    
    $this->app->instance(GeocodeService::class, $geocodeService);

    actingAs($user);
    $response = get('/api/vehicles/geocode/SW1A1AA');
    
    $response->assertOk();
    $response->assertJsonStructure(['latitude', 'longitude']);
});

it('validates postcode format in geocode endpoint', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);

    actingAs($user);
    $response = get('/api/vehicles/geocode/ABC');
    
    $response->assertStatus(422);
    $response->assertJsonStructure(['error', 'message', 'errors']);
});

it('handles failed geocoding', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    
    $geocodeService = Mockery::mock(GeocodeService::class);
    $geocodeService->shouldReceive('getCoordinatesFromPostcode')
        ->once()
        ->andReturn(null);
    
    $this->app->instance(GeocodeService::class, $geocodeService);

    actingAs($user);
    $response = get('/api/vehicles/geocode/INVALID1');
    
    $response->assertStatus(422);
    $response->assertJson([
        'error' => 'Could not geocode postcode',
    ]);
});

it('search endpoint uses same logic as index', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    $make = VehicleMake::factory()->create();
    $model = VehicleModel::factory()->create(['make_id' => $make->id]);
    
    Vehicle::factory()->count(2)->create([
        'make_id' => $make->id,
        'model_id' => $model->id,
        'status' => 'active',
    ]);

    actingAs($user);
    $response = get('/api/vehicles/search');
    
    $response->assertOk();
    $response->assertJsonCount(2, 'data');
});
