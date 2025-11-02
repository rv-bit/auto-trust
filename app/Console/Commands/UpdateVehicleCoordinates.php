<?php

namespace App\Console\Commands;

use App\Models\Vehicles\Vehicle;
use App\Services\GeocodeService;
use Illuminate\Console\Command;

class UpdateVehicleCoordinates extends Command
{
    protected $signature = 'vehicles:update-coordinates {--force : Force update all coordinates}';
    protected $description = 'Update coordinates for all vehicles with postcodes';

    public function handle()
    {
        $query = Vehicle::whereNotNull('postcode');
        
        if (!$this->option('force')) {
            $query->where(function($q) {
                $q->whereNull('latitude')
                  ->orWhereNull('longitude');
            });
        }

        $total = $query->count();
        $geocodeService = app(GeocodeService::class);
        $bar = $this->output->createProgressBar($total);
        $updated = 0;
        $failed = 0;

        $query->chunk(100, function($vehicles) use ($geocodeService, $bar, &$updated, &$failed) {
            foreach ($vehicles as $vehicle) {
                $coords = $geocodeService->getCoordinatesFromPostcode($vehicle->postcode);
                
                if ($coords && isset($coords['latitude'], $coords['longitude'])) {
                    $vehicle->update([
                        'latitude' => $coords['latitude'],
                        'longitude' => $coords['longitude']
                    ]);
                    $updated++;
                } else {
                    $this->error("Failed to get coordinates for vehicle {$vehicle->id} with postcode {$vehicle->postcode}");
                    $failed++;
                }
                
                $bar->advance();
            }
        });

        $bar->finish();
        $this->newLine();
        $this->info("Updated coordinates for {$updated} vehicles");
        if ($failed > 0) {
            $this->warn("Failed to update coordinates for {$failed} vehicles");
        }
    }
}