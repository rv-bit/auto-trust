<?php

namespace Database\Seeders;

use App\Models\Vehicles\Vehicle;
use App\Models\Vehicles\VehicleMake;

use App\Models\User;
use Illuminate\Database\Seeder;

class VehicleSeeder extends Seeder
{
    private array $bodyStyles = ['suv', 'hatchback', 'saloon', 'estate', 'coupe', 'mpv', 'convertible'];
    private array $fuelTypes = ['petrol', 'hybrid', 'diesel', 'electric'];
    private array $gearboxes = ['automatic', 'manual'];
    private array $colors = ['black', 'blue', 'brown', 'gold', 'green', 'grey', 'multi_colour', 'orange', 'beige'];
    private array $postcodes = ['WV6 0XD', 'B1 1AA', 'M1 1AA', 'E1 6AN', 'L1 1AA', 'G2 1BB', 'EH8 8DX', 'CF10 1AA'];
    private array $statuses = ['active', 'active', 'active', 'active', 'sold', 'inactive'];
    private array $conditions = ['new', 'used', 'used', 'used', 'nearly-new'];

    public function run(): void
    {
        $users = User::all();
        $makes = VehicleMake::with('models')->get();

        foreach (range(1, 50) as $i) {
            $make = $makes->random();
            $model = $make->models->random();
            $year = rand(2013, 2024);

            Vehicle::create([
                'make_id' => $make->id,
                'model_id' => $model->id,
                'seller_id' => $users->random()->id,
                'body_style' => $this->bodyStyles[array_rand($this->bodyStyles)],
                'fuel_type' => $this->fuelTypes[array_rand($this->fuelTypes)],
                'gearbox' => $this->gearboxes[array_rand($this->gearboxes)],
                'color' => $this->colors[array_rand($this->colors)],
                'year' => $year,
                'mileage' => rand(5000, 150000),
                'price' => rand(5000, 80000),
                'doors' => rand(2, 6),
                'seats' => rand(2, 7),
                'boot_space' => rand(250, 600) . ' litres',
                'engine' => rand(1, 4) . '.' . rand(0, 9) . 'L',
                'postcode' => $this->postcodes[array_rand($this->postcodes)],
                'latitude' => 52.5 + (rand(-100, 100) / 1000),
                'longitude' => -2.0 + (rand(-100, 100) / 1000),
                'safety_rating' => rand(1, 5),
                'images' => json_encode([
                    'https://via.placeholder.com/800x600?text=' . urlencode($make->name . ' ' . $model->name . ' - Front'),
                    'https://via.placeholder.com/800x600?text=' . urlencode($make->name . ' ' . $model->name . ' - Side'),
                    'https://via.placeholder.com/800x600?text=' . urlencode($make->name . ' ' . $model->name . ' - Interior'),
                    'https://via.placeholder.com/800x600?text=' . urlencode($make->name . ' ' . $model->name . ' - Back'),
                ]),
                'status' => $this->statuses[array_rand($this->statuses)],
                'condition' => $this->conditions[array_rand($this->conditions)],
                'extras' => json_encode([
                    'climateControl' => (bool)rand(0, 1),
                    'twoOrMoreKeys' => (bool)rand(0, 1),
                    'satnav' => (bool)rand(0, 1),
                    'sunroof' => (bool)rand(0, 1),
                    'towBar' => (bool)rand(0, 1),
                    'lockingWheelNut' => (bool)rand(0, 1),
                    'spareWheel' => (bool)rand(0, 1),
                    'wheelToolkit' => (bool)rand(0, 1),
                    'androidAuto' => (bool)rand(0, 1),
                    'appleCarPlay' => (bool)rand(0, 1),
                    'cruiseControl' => (bool)rand(0, 1),
                ]),
                'specification' => json_encode([
                    'cruiseControl' => (bool)rand(0, 1),
                    'parkingSensors' => (bool)rand(0, 1),
                    'touchscreenInfotainment' => (bool)rand(0, 1),
                    'navigation' => (bool)rand(0, 1),
                    'appleCarPlay' => (bool)rand(0, 1),
                    'androidAuto' => (bool)rand(0, 1),
                    'parkingCamera' => (bool)rand(0, 1),
                    'climateControl' => (bool)rand(0, 1),
                ]),
            ]);
        }
    }
}
