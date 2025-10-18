<?php

namespace App\Http\Controllers\Vehicles;

use App\Http\Controllers\Controller;

use App\Models\Vehicles\VehicleMake;
use App\Models\Vehicles\VehicleModel;

use Illuminate\Http\JsonResponse;

class VehicleModelController extends Controller
{
    /**
     * Display models for a specific make
     */
    public function byMake(VehicleMake $make): JsonResponse
    {
        $models = $make->models()->get();

        return response()->json($models);
    }

    /**
     * Display all vehicle models
     */
    public function index(): JsonResponse
    {
        $models = VehicleModel::with('make')->get();

        return response()->json($models);
    }
}
