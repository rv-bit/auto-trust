<?php

namespace App\Http\Middleware;

use App\Models\Vehicles\VehicleMake;
use App\Models\Vehicles\VehicleModel;

use App\Http\Resources\Vehicles\VehicleMakeResource;
use App\Http\Resources\Vehicles\VehicleModelResource;

use Illuminate\Support\Facades\Cache;
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

        $vehicle_makes = Cache::rememberForever('vehicle_makes', function () {
            return VehicleMakeResource::collection(
                VehicleMake::orderBy('name')->get()
            )->resolve();
        });

        $vehicle_models = Cache::rememberForever('vehicle_models', function () {
            return VehicleModelResource::collection(
                VehicleModel::with('make')->orderBy('name')->get()
            )->resolve();
        });

        return [
            ...parent::share($request),
            
            'vehicle_makes' => $vehicle_makes,
            'vehicle_models' => $vehicle_models,
        ];
    }
}