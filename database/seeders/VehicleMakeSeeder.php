<?php

namespace Database\Seeders;

use App\Models\Vehicles\VehicleMake;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class VehicleMakeSeeder extends Seeder
{
    public function run(): void
    {
        $makes = [
            'Toyota',
            'Honda',
            'Ford',
            'BMW',
            'Mercedes-Benz',
            'Audi',
            'Volkswagen',
            'Nissan',
            'Hyundai',
            'Kia',
            'Mazda',
            'Subaru',
            'Lexus',
            'Jaguar',
            'Land Rover',
            'Volvo',
            'Peugeot',
            'Renault',
            'Fiat',
            'Alfa Romeo',
            'Porsche',
            'Tesla',
            'Chevrolet',
            'GMC',
            'Jeep',
            'Ram',
            'Dodge',
            'Cadillac',
        ];

        foreach ($makes as $make) {
            VehicleMake::firstOrCreate([
                'name' => $make,
                'slug' => Str::slug($make),
            ]);
        }
    }
}
