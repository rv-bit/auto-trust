<?php

namespace App\Http\Controllers\Vehicles;

use App\Http\Controllers\Controller;

use App\Models\Vehicles\VehicleMake;

use Illuminate\Http\JsonResponse;

class VehicleMakeController extends Controller
{
    /**
     * Display a listing of vehicle makes
     */
    public function index(): JsonResponse
    {
        $makes = VehicleMake::all();

        return response()->json($makes);
    }

    /**
     * Display a specific make with models
     */
    public function show(VehicleMake $make): JsonResponse
    {
        $make->load('models');

        return response()->json($make);
    }
}
