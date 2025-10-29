<?php

namespace App\Http\Middleware;

use App\Models\Vehicles\VehicleMake;
use App\Models\Vehicles\VehicleModel;

use App\Http\Resources\Vehicles\VehicleMakeResource;
use App\Http\Resources\Vehicles\VehicleModelResource;

use Illuminate\Support\Facades\Log;
use Inertia\Middleware;
use Illuminate\Http\Request;

class HandleVehicleRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        Log::info('Makes', [VehicleMake::orderBy('name')->get()]);

        return [
            ...parent::share($request),
            
            'vehicle_makes' => VehicleMakeResource::collection(
                VehicleMake::orderBy('name')->get()
            )->resolve(),
            
            'vehicle_models' => VehicleModelResource::collection(
                VehicleModel::with('make')->orderBy('name')->get()
            )->resolve(),
        ];
    }
}