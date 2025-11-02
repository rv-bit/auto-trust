<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class GeocodeService
{
    protected ?string $apiKey;

    public function __construct()
    {
        $this->apiKey = config('services.google.maps_api_key') ?: null;
    }

    /**
     * Get coordinates from postcode using Google Geocoding API
     */
    public function getCoordinatesFromPostcode(string $postcode): ?array
    {
        $cacheKey = 'geocode_' . str_replace(' ', '', strtolower($postcode));
        
        return Cache::remember($cacheKey, now()->addDays(30), function () use ($postcode) {
            if (empty($this->apiKey)) {
                return null;
            }

            $response = Http::get('https://maps.googleapis.com/maps/api/geocode/json', [
                'address' => $postcode . ', UK',
                'key' => $this->apiKey,
            ]);

            if (!$response->successful() || empty($response->json('results'))) {
                return null;
            }

            $location = $response->json('results.0.geometry.location');
            
            return [
                'latitude' => $location['lat'] ?? null,
                'longitude' => $location['lng'] ?? null,
            ];
        });
    }

    /**
     * Calculate distance between two coordinates using Haversine formula
     */
    public function calculateDistance(float $lat1, float $lon1, float $lat2, float $lon2): float
    {
        $earthRadius = 3959; // miles (use 6371 for kilometers)

        $latFrom = deg2rad($lat1);
        $lonFrom = deg2rad($lon1);
        $latTo = deg2rad($lat2);
        $lonTo = deg2rad($lon2);

        $latDelta = $latTo - $latFrom;
        $lonDelta = $lonTo - $lonFrom;

        $angle = 2 * asin(sqrt(pow(sin($latDelta / 2), 2) +
            cos($latFrom) * cos($latTo) * pow(sin($lonDelta / 2), 2)));

        return $angle * $earthRadius;
    }
}
