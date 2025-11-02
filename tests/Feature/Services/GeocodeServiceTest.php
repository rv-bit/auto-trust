<?php

declare(strict_types=1);

use App\Services\GeocodeService;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Config;

beforeEach(function () {
    Cache::flush();
    Config::set('services.google.maps_api_key', 'test-api-key');
});

it('returns coordinates for a valid postcode', function () {
    Http::fake([
        'maps.googleapis.com/*' => Http::response([
            'results' => [
                [
                    'geometry' => [
                        'location' => [
                            'lat' => 51.5014,
                            'lng' => -0.1419,
                        ],
                    ],
                ],
            ],
        ], 200),
    ]);

    $service = new GeocodeService();
    $result = $service->getCoordinatesFromPostcode('SW1A 1AA');

    expect($result)->toBe([
        'latitude' => 51.5014,
        'longitude' => -0.1419,
    ]);
});

it('returns null when API key is not configured', function () {
    Config::set('services.google.maps_api_key', null);

    $service = new GeocodeService();
    $result = $service->getCoordinatesFromPostcode('SW1A 1AA');

    expect($result)->toBeNull();
});

it('returns null when API request fails', function () {
    Http::fake([
        'maps.googleapis.com/*' => Http::response([], 500),
    ]);

    $service = new GeocodeService();
    $result = $service->getCoordinatesFromPostcode('SW1A 1AA');

    expect($result)->toBeNull();
});

it('returns null when no results are found', function () {
    Http::fake([
        'maps.googleapis.com/*' => Http::response([
            'results' => [],
        ], 200),
    ]);

    $service = new GeocodeService();
    $result = $service->getCoordinatesFromPostcode('INVALID');

    expect($result)->toBeNull();
});

it('caches geocoding results', function () {
    Http::fake([
        'maps.googleapis.com/*' => Http::response([
            'results' => [
                [
                    'geometry' => [
                        'location' => [
                            'lat' => 51.5014,
                            'lng' => -0.1419,
                        ],
                    ],
                ],
            ],
        ], 200),
    ]);

    $service = new GeocodeService();
    
    // First call - should hit the API
    $result1 = $service->getCoordinatesFromPostcode('SW1A 1AA');
    
    // Second call - should use cache
    $result2 = $service->getCoordinatesFromPostcode('SW1A 1AA');

    expect($result1)->toBe($result2);
    
    // Verify only one HTTP request was made
    Http::assertSentCount(1);
});

it('normalizes postcode for cache key', function () {
    Http::fake([
        'maps.googleapis.com/*' => Http::response([
            'results' => [
                [
                    'geometry' => [
                        'location' => [
                            'lat' => 51.5014,
                            'lng' => -0.1419,
                        ],
                    ],
                ],
            ],
        ], 200),
    ]);

    $service = new GeocodeService();
    
    // Call with different spacing
    $result1 = $service->getCoordinatesFromPostcode('SW1A 1AA');
    $result2 = $service->getCoordinatesFromPostcode('SW1A1AA');

    expect($result1)->toBe($result2);
    
    // Should only make one API call since cache key is normalized
    Http::assertSentCount(1);
});

it('calculates distance between two coordinates correctly', function () {
    $service = new GeocodeService();
    
    // London to Birmingham (approximately 110 miles)
    $distance = $service->calculateDistance(
        51.5074, // London lat
        -0.1278, // London lng
        52.4862, // Birmingham lat
        -1.8904  // Birmingham lng
    );

    // Check distance is approximately 110 miles (with some tolerance)
    expect($distance)->toBeGreaterThan(100);
    expect($distance)->toBeLessThan(120);
});

it('calculates zero distance for same coordinates', function () {
    $service = new GeocodeService();
    
    $distance = $service->calculateDistance(
        51.5074,
        -0.1278,
        51.5074,
        -0.1278
    );

    expect($distance)->toBeLessThan(0.1);
});

it('calculates distance using haversine formula correctly', function () {
    $service = new GeocodeService();
    
    // Short distance: London Victoria to London Kings Cross (about 3-4 miles)
    $distance = $service->calculateDistance(
        51.4952, // Victoria lat
        -0.1441, // Victoria lng
        51.5308, // Kings Cross lat
        -0.1238  // Kings Cross lng
    );

    expect($distance)->toBeGreaterThan(2);
    expect($distance)->toBeLessThan(5);
});
