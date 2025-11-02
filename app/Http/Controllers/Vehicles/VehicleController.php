<?php

namespace App\Http\Controllers\Vehicles;

use App\Http\Controllers\Controller;

use App\Models\Vehicles\Vehicle;
use App\Services\GeocodeService;

use App\Http\Requests\Vehicles\StoreVehicleRequest;
use App\Http\Requests\Vehicles\UpdateVehicleRequest;
use App\Http\Resources\Vehicles\VehicleResource;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class VehicleController extends Controller
{
    /**
     * Display a listing of vehicles with filters
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Vehicle::query()->with(['make', 'model']);

        if ($request->filled('make')) {
            $query->whereHas('make', fn($q) => $q->where('slug', $request->make));
        }

        if ($request->filled('model')) {
            $query->whereHas('model', fn($q) => $q->where('slug', $request->model));
        }

        if ($request->filled('bodyStyle')) {
            $query->byBodyStyle((array)$request->bodyStyle);
        }

        if ($request->filled('fuelType')) {
            $query->byFuelType((array)$request->fuelType);
        }

        if ($request->filled('gearbox')) {
            $query->byGearbox((array)$request->gearbox);
        }

        if ($request->filled('color')) {
            $query->byColor((array)$request->color);
        }

        // Vehicle condition/age filtering
        if ($request->filled('vehicleAge') && $request->vehicleAge !== 'all') {
            $query->byCondition($request->vehicleAge);
        }

        // Price filtering - support both formats
        if ($request->filled('price')) {
            $query->priceRange(
                $request->input('price.min'),
                $request->input('price.max')
            );
        } elseif ($request->filled('priceMin') || $request->filled('priceMax')) {
            $query->priceRange(
                $request->input('priceMin'),
                $request->input('priceMax')
            );
        }

        // Year filtering - support both formats
        if ($request->filled('year')) {
            $query->yearRange(
                $request->input('year.from', 1900),
                $request->input('year.to', now()->year)
            );
        } elseif ($request->filled('yearFrom') && $request->filled('yearTo')) {
            $query->yearRange(
                $request->input('yearFrom', 1900),
                $request->input('yearTo', now()->year)
            );
        }

        // Mileage filtering - support both formats
        if ($request->filled('mileage')) {
            $query->mileageRange(
                $request->input('mileage.min'),
                $request->input('mileage.max')
            );
        } elseif ($request->filled('mileageMin') || $request->filled('mileageMax')) {
            $query->mileageRange(
                $request->input('mileageMin'),
                $request->input('mileageMax')
            );
        }

        // Location filtering
        if ($request->filled('postcode')) {
            $radius = $request->input('radius', 50); // Default 50 miles
            $query->nearPostcode($request->postcode, $radius);
        }

        // Safety rating filtering
        if ($request->filled('safetyRating') && $request->safetyRating !== 'any') {
            $query->where('safety_rating', '>=', (int)str_replace('_star_up', '', $request->safetyRating));
        }

        // Equipment/Specification filtering
        if ($request->filled('specification')) {
            foreach ($request->specification as $spec => $value) {
                if ($value) {
                    $query->whereJsonContains('specification->' . $spec, true);
                }
            }
        }

        // Extra features filtering
        if ($request->filled('extras')) {
            foreach ($request->extras as $extra => $value) {
                if ($value) {
                    $query->whereJsonContains('extras->' . $extra, true);
                }
            }
        }

        // Only show active vehicles
        $query->active();

        // Pagination
        $perPage = $request->input('per_page', 15);
        $vehicles = $query->paginate($perPage);

        return VehicleResource::collection($vehicles);
    }

    /**
     * Store a newly created vehicle in storage
     */
    public function store(StoreVehicleRequest $request, GeocodeService $geocodeService): JsonResponse
    {
        $data = $request->validated();
        
        // Get coordinates from postcode using Google Maps Geocoding API
        if (!empty($data['postcode'])) {
            $coordinates = $geocodeService->getCoordinatesFromPostcode($data['postcode']);
            if ($coordinates) {
                $data['latitude'] = $coordinates['latitude'];
                $data['longitude'] = $coordinates['longitude'];
            }
        }
        
        // Handle image uploads
        $imagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                // Store in public/storage/vehicles folder
                $path = $image->store('vehicles', 'public');
                $imagePaths[] = $path;
            }
        }
        
        // Replace images array with stored paths
        $data['images'] = $imagePaths;
        
        // Set seller_id to current authenticated user
        $data['seller_id'] = auth()->id();
        
        $vehicle = Vehicle::create($data);

        return response()->json($vehicle->load(['make', 'model']), 201);
    }

    /**
     * Display the specified vehicle
     */
    public function show(Vehicle $vehicle): JsonResponse
    {
        $vehicle->load(['make', 'model', 'seller']);
        return response()->json(VehicleResource::make($vehicle));
    }

    /**
     * Display the vehicle details page (Inertia)
     */
    public function showPage(string $id)
    {
        $vehicle = Vehicle::with(['make', 'model', 'seller'])
            ->findOrFail($id);

        return inertia('vehicles/[slug]/page', [
            'vehicle' => VehicleResource::make($vehicle)->resolve(),
        ]);
    }

    /**
     * Update the specified vehicle in storage
     */
    public function update(UpdateVehicleRequest $request, Vehicle $vehicle): JsonResponse
    {
        $vehicle->update($request->validated());

        return response()->json($vehicle->load(['make', 'model']));
    }

    /**
     * Remove the specified vehicle from storage
     */
    public function destroy(Vehicle $vehicle): JsonResponse
    {
        $vehicle->delete();

        return response()->json(null, 204);
    }

    /**
     * Geocode a postcode to get latitude and longitude
     */
    public function geocodePostcode(string $postcode, GeocodeService $geocodeService): JsonResponse
    {
        // Validate the postcode using Laravel's validator
        $validator = Validator::make(
            ['postcode' => $postcode],
            ['postcode' => 'required|string|max:10|min:5']
        );

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Invalid postcode',
                'message' => $validator->errors()->first('postcode'),
                'errors' => $validator->errors(),
            ], 422);
        }

        $coordinates = $geocodeService->getCoordinatesFromPostcode($postcode);

        if (!$coordinates) {
            return response()->json([
                'error' => 'Could not geocode postcode',
                'message' => 'Please check the postcode and try again.',
            ], 422);
        }

        return response()->json($coordinates);
    }

    /**
     * Search vehicles endpoint
     */
    public function search(Request $request): AnonymousResourceCollection
    {
        return $this->index($request);
    }

    /**
     * Get filter counts based on current filters
     */
    public function filterCounts(Request $request): JsonResponse
    {
        // For each filter, exclude only itself, always apply make, model, price, location, and condition
        $counts = [
            'bodyStyle' => $this->getCountsByField('body_style', $request, ['bodyStyle']),
            'fuelType' => $this->getCountsByField('fuel_type', $request, ['fuelType']),
            'gearbox' => $this->getCountsByField('gearbox', $request, ['gearbox']),
            'color' => $this->getCountsByField('color', $request, ['color']),
            'vehicleAge' => $this->getCountsByCondition($request),
            'makes' => $this->getMakeCounts($request),
            'models' => $this->getModelCounts($request),
        ];

        return response()->json($counts);
    }

    /**
     * Apply filters to query excluding specific filter types
     */
    private function applyFilters($query, Request $request, array $excludeFilters = [])
    {
        if (!in_array('make', $excludeFilters) && $request->filled('make')) {
            $query->whereHas('make', fn($q) => $q->where('slug', $request->make));
        }

        if (!in_array('model', $excludeFilters) && $request->filled('model')) {
            $query->whereHas('model', fn($q) => $q->where('slug', $request->model));
        }

        if (!in_array('bodyStyle', $excludeFilters) && $request->filled('bodyStyle')) {
            $query->byBodyStyle((array)$request->bodyStyle);
        }

        if (!in_array('fuelType', $excludeFilters) && $request->filled('fuelType')) {
            $query->byFuelType((array)$request->fuelType);
        }

        if (!in_array('gearbox', $excludeFilters) && $request->filled('gearbox')) {
            $query->byGearbox((array)$request->gearbox);
        }

        if (!in_array('color', $excludeFilters) && $request->filled('color')) {
            $query->byColor((array)$request->color);
        }

        if (!in_array('vehicleAge', $excludeFilters) && $request->filled('vehicleAge') && $request->vehicleAge !== 'all') {
            $query->byCondition($request->vehicleAge);
        }

        if (!in_array('price', $excludeFilters)) {
            if ($request->filled('price')) {
                $query->priceRange(
                    $request->input('price.min'),
                    $request->input('price.max')
                );
            } elseif ($request->filled('priceMin') || $request->filled('priceMax')) {
                $query->priceRange(
                    $request->input('priceMin'),
                    $request->input('priceMax')
                );
            }
        }

        if (!in_array('year', $excludeFilters)) {
            if ($request->filled('year')) {
                $query->yearRange(
                    $request->input('year.from', 1900),
                    $request->input('year.to', now()->year)
                );
            } elseif ($request->filled('yearFrom') && $request->filled('yearTo')) {
                $query->yearRange(
                    $request->input('yearFrom', 1900),
                    $request->input('yearTo', now()->year)
                );
            }
        }

        if (!in_array('mileage', $excludeFilters)) {
            if ($request->filled('mileage')) {
                $query->mileageRange(
                    $request->input('mileage.min'),
                    $request->input('mileage.max')
                );
            } elseif ($request->filled('mileageMin') || $request->filled('mileageMax')) {
                $query->mileageRange(
                    $request->input('mileageMin'),
                    $request->input('mileageMax')
                );
            }
        }

        if (!in_array('postcode', $excludeFilters) && $request->filled('postcode')) {
            $radius = $request->input('radius', 50); // Default 50 miles
            $query->nearPostcode($request->postcode, $radius);
        }

        if (!in_array('safetyRating', $excludeFilters) && $request->filled('safetyRating') && $request->safetyRating !== 'any') {
            $query->where('safety_rating', '>=', (int)str_replace('_star_up', '', $request->safetyRating));
        }

        if (!in_array('specification', $excludeFilters) && $request->filled('specification')) {
            foreach ($request->specification as $spec => $value) {
                if ($value) {
                    $query->whereJsonContains('specification->' . $spec, true);
                }
            }
        }

        if (!in_array('extras', $excludeFilters) && $request->filled('extras')) {
            foreach ($request->extras as $extra => $value) {
                if ($value) {
                    $query->whereJsonContains('extras->' . $extra, true);
                }
            }
        }

        return $query;
    }

    /**
     * Get counts for a specific field
     */
    /**
     * For filter counts (body style, fuel type, gearbox, color, etc.), always apply make, model, price, location, and condition filters,
     * and only exclude the filter being counted.
     */
    private function getCountsByField(string $field, Request $request, array $excludeFilters = [])
    {
        $query = Vehicle::query()->active();
        // Always exclude only the filter being counted, always apply make, model, price, location, and condition
        $this->applyFilters($query, $request, $excludeFilters);

        return $query->select($field, \DB::raw('count(*) as count'))
            ->whereNotNull($field)
            ->groupBy($field)
            ->pluck('count', $field)
            ->toArray();
    }

    /**
     * Get counts by vehicle condition
     */
    private function getCountsByCondition(Request $request)
    {
        $query = Vehicle::query()->active();
        $this->applyFilters($query, $request, ['vehicleAge']);
        
        return $query->select('condition', \DB::raw('count(*) as count'))
            ->whereNotNull('condition')
            ->groupBy('condition')
            ->pluck('count', 'condition')
            ->toArray();
    }

    /**
     * Get counts by make
     */
    private function getMakeCounts(Request $request)
    {
        $query = Vehicle::query()->active();
        $this->applyFilters($query, $request, ['make']);
        
        return $query->join('vehicle_makes', 'vehicles.make_id', '=', 'vehicle_makes.id')
            ->select('vehicle_makes.slug', \DB::raw('count(*) as count'))
            ->groupBy('vehicle_makes.slug')
            ->pluck('count', 'slug')
            ->toArray();
    }

    /**
     * Get counts by model (only when make is selected)
     */
    private function getModelCounts(Request $request)
    {
        if (!$request->filled('make')) {
            return [];
        }

        $query = Vehicle::query()->active();
        $this->applyFilters($query, $request, ['model']);
        
        return $query->join('vehicle_models', 'vehicles.model_id', '=', 'vehicle_models.id')
            ->select('vehicle_models.slug', \DB::raw('count(*) as count'))
            ->groupBy('vehicle_models.slug')
            ->pluck('count', 'slug')
            ->toArray();
    }

    /**
     * Get all vehicles for admin dashboard
     * Admin only - shows all vehicles regardless of status
     */
    public function adminIndex(Request $request): AnonymousResourceCollection
    {
        $query = Vehicle::query()
            ->with(['make', 'model', 'seller'])
            ->orderBy('created_at', 'desc');

        // Optional filters
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $searchTerm = $request->search;
            $query->where(function($q) use ($searchTerm) {
                $q->whereHas('make', fn($query) => $query->where('name', 'like', "%{$searchTerm}%"))
                  ->orWhereHas('model', fn($query) => $query->where('name', 'like', "%{$searchTerm}%"))
                  ->orWhereHas('seller', fn($query) => $query->where('name', 'like', "%{$searchTerm}%"))
                  ->orWhere('id', 'like', "%{$searchTerm}%");
            });
        }

        $perPage = $request->input('per_page', 20);
        $vehicles = $query->paginate($perPage);

        return VehicleResource::collection($vehicles);
    }

    /**
     * Get current user's posted vehicles
     */
    public function myVehicles(Request $request): AnonymousResourceCollection
    {
        $query = Vehicle::query()
            ->with(['make', 'model'])
            ->where('seller_id', auth()->id())
            ->orderBy('created_at', 'desc');

        // Optional status filter
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $perPage = $request->input('per_page', 10);
        $vehicles = $query->paginate($perPage);

        return VehicleResource::collection($vehicles);
    }

    /**
     * Update vehicle status (active/inactive/sold)
     */
    public function updateStatus(Request $request, Vehicle $vehicle): JsonResponse
    {
        // Ensure the user owns this vehicle
        if ($vehicle->seller_id !== auth()->id()) {
            return response()->json([
                'error' => 'Unauthorized',
                'message' => 'You do not have permission to update this vehicle.'
            ], 403);
        }

        $request->validate([
            'status' => 'required|in:active,inactive,sold'
        ]);

        $vehicle->update(['status' => $request->status]);

        return response()->json([
            'message' => 'Vehicle status updated successfully',
            'vehicle' => VehicleResource::make($vehicle->load(['make', 'model']))
        ]);
    }
}
