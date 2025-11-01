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

        // Cache filter options from actual vehicles in database
        $filter_options = Cache::remember('vehicle_filter_options', 60 * 60 * 24, function () {
            return [
                'bodyStyles' => \DB::table('vehicles')
                    ->select('body_style as value', \DB::raw('COUNT(*) as count'))
                    ->whereNotNull('body_style')
                    ->where('status', 'active')
                    ->groupBy('body_style')
                    ->orderBy('count', 'desc')
                    ->get()
                    ->map(fn($item) => [
                        'value' => $item->value,
                        'label' => ucfirst(str_replace('_', ' ', $item->value)),
                        'count' => $item->count,
                    ])
                    ->toArray(),

                'fuelTypes' => \DB::table('vehicles')
                    ->select('fuel_type as value', \DB::raw('COUNT(*) as count'))
                    ->whereNotNull('fuel_type')
                    ->where('status', 'active')
                    ->groupBy('fuel_type')
                    ->orderBy('count', 'desc')
                    ->get()
                    ->map(fn($item) => [
                        'value' => $item->value,
                        'label' => ucfirst(str_replace('_', ' ', $item->value)),
                        'count' => $item->count,
                    ])
                    ->toArray(),

                'gearboxes' => \DB::table('vehicles')
                    ->select('gearbox as value', \DB::raw('COUNT(*) as count'))
                    ->whereNotNull('gearbox')
                    ->where('status', 'active')
                    ->groupBy('gearbox')
                    ->orderBy('count', 'desc')
                    ->get()
                    ->map(fn($item) => [
                        'value' => $item->value,
                        'label' => ucfirst($item->value),
                        'count' => $item->count,
                    ])
                    ->toArray(),

                'colors' => \DB::table('vehicles')
                    ->select('color as value', \DB::raw('COUNT(*) as count'))
                    ->whereNotNull('color')
                    ->where('status', 'active')
                    ->groupBy('color')
                    ->orderBy('count', 'desc')
                    ->get()
                    ->map(fn($item) => [
                        'value' => $item->value,
                        'label' => ucfirst(str_replace('_', ' ', $item->value)),
                        'count' => $item->count,
                    ])
                    ->toArray(),

                'conditions' => \DB::table('vehicles')
                    ->select('condition as value', \DB::raw('COUNT(*) as count'))
                    ->whereNotNull('condition')
                    ->where('status', 'active')
                    ->groupBy('condition')
                    ->orderBy('count', 'desc')
                    ->get()
                    ->map(fn($item) => [
                        'value' => $item->value,
                        'label' => ucfirst(str_replace('-', ' ', $item->value)),
                        'count' => $item->count,
                    ])
                    ->toArray(),

                'priceRange' => [
                    'min' => \DB::table('vehicles')->where('status', 'active')->min('price') ?? 0,
                    'max' => \DB::table('vehicles')->where('status', 'active')->max('price') ?? 100000,
                ],

                'yearRange' => [
                    'min' => \DB::table('vehicles')->where('status', 'active')->min('year') ?? 1990,
                    'max' => \DB::table('vehicles')->where('status', 'active')->max('year') ?? date('Y'),
                ],

                'mileageRange' => [
                    'min' => \DB::table('vehicles')->where('status', 'active')->min('mileage') ?? 0,
                    'max' => \DB::table('vehicles')->where('status', 'active')->max('mileage') ?? 200000,
                ],
            ];
        });

        return [
            ...parent::share($request),
            
            'vehicle_makes' => $vehicle_makes,
            'vehicle_models' => $vehicle_models,
            'filter_options' => $filter_options,
        ];
    }
}