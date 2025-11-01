<?php

namespace Database\Factories\Vehicles;

use App\Models\Vehicles\Vehicle;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class VehicleFactory extends Factory
{
    protected $model = Vehicle::class;

    public function definition()
    {
        return [
            'make_id' => \App\Models\Vehicles\VehicleMake::factory(),
            'model_id' => \App\Models\Vehicles\VehicleModel::factory(),
            'seller_id' => User::factory(),
            'body_style' => $this->faker->randomElement(['suv', 'hatchback', 'saloon', 'estate', 'coupe', 'mpv', 'convertible']),
            'fuel_type' => $this->faker->randomElement(['petrol', 'diesel', 'electric', 'hybrid']),
            'gearbox' => $this->faker->randomElement(['automatic', 'manual']),
            'color' => $this->faker->randomElement(['black', 'blue', 'brown', 'gold', 'green', 'grey', 'multi_colour', 'orange', 'beige']),
            'year' => $this->faker->numberBetween(2000, 2024),
            'mileage' => $this->faker->numberBetween(0, 200000),
            'price' => $this->faker->numberBetween(1000, 100000),
            'doors' => $this->faker->numberBetween(2, 5),
            'seats' => $this->faker->numberBetween(2, 7),
            'boot_space' => (string) $this->faker->numberBetween(200, 800),
            'engine' => $this->faker->randomElement(['V6', 'V8', 'I4', 'I6', 'Electric']),
            'latitude' => $this->faker->latitude(51.3, 51.7),
            'longitude' => $this->faker->longitude(-0.5, 0.3),
            'postcode' => $this->faker->postcode(),
            'extras' => json_encode([
                'sunroof' => $this->faker->boolean(),
                'leather_seats' => $this->faker->boolean(),
                'navigation' => $this->faker->boolean(),
                'bluetooth' => $this->faker->boolean(),
            ]),
            'specification' => json_encode([
                'horsepower' => $this->faker->numberBetween(70, 600),
                'torque' => $this->faker->numberBetween(100, 800),
            ]),
            'safety_rating' => $this->faker->numberBetween(1, 5),
            'images' => json_encode([
                $this->faker->imageUrl(640, 480, 'cars'),
                $this->faker->imageUrl(640, 480, 'cars'),
                $this->faker->imageUrl(640, 480, 'cars'),
            ]),
            'status' => $this->faker->randomElement(['active', 'inactive', 'sold']),
            'condition' => $this->faker->randomElement(['new', 'nearly-new', 'used']),
        ];
    }
}
