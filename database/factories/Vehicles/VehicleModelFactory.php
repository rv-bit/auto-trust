<?php


namespace Database\Factories\Vehicles;

use App\Models\Vehicles\VehicleModel;
use App\Models\Vehicles\VehicleMake;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class VehicleModelFactory extends Factory
{
    protected $model = VehicleModel::class;

    public function definition()
    {
        $name = $this->faker->word();
        return [
            'make_id' => VehicleMake::factory(),
            'name' => $name,
            'slug' => Str::slug($name),
        ];
    }
}
