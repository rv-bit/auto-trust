<?php

namespace App\Http\Controllers\Vehicles;

use App\Http\Controllers\Controller;

use App\Models\Vehicles\Vehicle;

use App\Http\Requests\Vehicles\StoreVehicleRequest;
use App\Http\Requests\Vehicles\UpdateVehicleRequest;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    /**
     * Display a listing of vehicles with filters
     */
    public function index(Request $request): JsonResponse
    {
        $query = Vehicle::query()->with(['make', 'model']);

        // Apply filters
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

        // Price filtering
        if ($request->filled('price')) {
            $query->priceRange(
                $request->input('price.min'),
                $request->input('price.max')
            );
        }

        // Year filtering
        if ($request->filled('year')) {
            $query->yearRange(
                $request->input('year.from', 1900),
                $request->input('year.to', now()->year)
            );
        }

        // Mileage filtering
        if ($request->filled('mileage')) {
            $query->mileageRange(
                $request->input('mileage.min'),
                $request->input('mileage.max')
            );
        }

        // Location filtering
        if ($request->filled('postcode')) {
            $query->nearPostcode($request->postcode);
        }

        // Safety rating filtering
        if ($request->filled('safetyRating') && $request->safetyRating !== 'any') {
            $query->where('safety_rating', '>=', (int)str_replace('_star_up', '', $request->safetyRating));
        }

        // Only show active vehicles
        $query->active();

        // Pagination
        $perPage = $request->input('per_page', 15);
        $vehicles = $query->paginate($perPage);

        return response()->json($vehicles);
    }

    /**
     * Store a newly created vehicle in storage
     */
    public function store(StoreVehicleRequest $request): JsonResponse
    {
        $vehicle = Vehicle::create($request->validated());

        return response()->json($vehicle->load(['make', 'model']), 201);
    }

    /**
     * Display the specified vehicle
     */
    public function show(Vehicle $vehicle): JsonResponse
    {
        return response()->json($vehicle->load(['make', 'model']));
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
     * Search vehicles endpoint
     */
    public function search(Request $request): JsonResponse
    {
        return $this->index($request);
    }
}
