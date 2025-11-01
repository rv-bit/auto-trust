<?php


namespace Database\Factories\Vehicles;

use App\Models\Vehicles\VehicleMake;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class VehicleMakeFactory extends Factory
{
    protected $model = VehicleMake::class;

    public function definition()
    {
        $name = $this->faker->company();
        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'logo_url' => $this->faker->imageUrl(200, 100, 'car-logo'),
        ];
    }
}
