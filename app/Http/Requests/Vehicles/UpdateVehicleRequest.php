<?php

namespace App\Http\Requests\Vehicles;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class UpdateVehicleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::check() && Auth::user()->id === $this->vehicle->seller_id;
    }

    public function rules(): array
    {
        return [
            'make_id' => 'sometimes|integer|exists:vehicle_makes,id',
            'model_id' => 'sometimes|integer|exists:vehicle_models,id',
            'body_style' => 'sometimes|in:suv,hatchback,saloon,estate,coupe,mpv,convertible',
            'fuel_type' => 'sometimes|in:petrol,hybrid,diesel,electric',
            'gearbox' => 'sometimes|in:automatic,manual',
            'color' => 'sometimes|in:black,blue,brown,gold,green,grey,multi_colour,orange,beige',
            'year' => 'sometimes|integer|min:1900|max:' . now()->year,
            'mileage' => 'sometimes|integer|min:0',
            'price' => 'sometimes|integer|min:0',
            'doors' => 'sometimes|integer|min:2|max:6',
            'seats' => 'nullable|integer|min:1',
            'boot_space' => 'nullable|string|max:255',
            'engine' => 'nullable|string|max:255',
            'postcode' => 'sometimes|string|max:10',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'extras' => 'nullable|json',
            'specification' => 'nullable|json',
            'safety_rating' => 'nullable|integer|min:1|max:5',
            'images' => 'sometimes|array',
            'images.*' => 'image|mimes:jpeg,jpg,png,webp|max:10240',
            'status' => 'sometimes|in:active,sold,inactive',
            'condition' => 'sometimes|in:new,used,nearly-new',
        ];
    }
}
