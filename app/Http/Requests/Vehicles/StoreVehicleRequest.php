<?php

namespace App\Http\Requests\Vehicles;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class StoreVehicleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::check();
    }

    public function rules(): array
    {
        return [
            'make_id' => 'required|integer|exists:vehicle_makes,id',
            'model_id' => 'required|integer|exists:vehicle_models,id',
            'body_style' => 'required|in:suv,hatchback,saloon,estate,coupe,mpv,convertible',
            'fuel_type' => 'required|in:petrol,hybrid,diesel,electric',
            'gearbox' => 'required|in:automatic,manual',
            'color' => 'required|in:black,blue,brown,gold,green,grey,multi_colour,orange,beige',
            'year' => 'required|integer|min:1900|max:' . now()->year,
            'mileage' => 'required|integer|min:0',
            'price' => 'required|integer|min:0',
            'doors' => 'required|integer|min:2|max:6',
            'seats' => 'nullable|integer|min:1',
            'boot_space' => 'nullable|string|max:255',
            'engine' => 'nullable|string|max:255',
            'postcode' => 'required|string|max:10',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'extras' => 'nullable|json',
            'specification' => 'nullable|json',
            'safety_rating' => 'nullable|integer|min:1|max:5',
            'image_url' => 'nullable|url',
        ];
    }

    public function messages(): array
    {
        return [
            'make_id.required' => 'Please select a vehicle make',
            'model_id.required' => 'Please select a vehicle model',
            'body_style.required' => 'Please select a body style',
            'fuel_type.required' => 'Please select a fuel type',
            'gearbox.required' => 'Please select a gearbox type',
            'color.required' => 'Please select a color',
            'year.required' => 'Please enter the year',
            'mileage.required' => 'Please enter the mileage',
            'price.required' => 'Please enter the price',
            'doors.required' => 'Please enter the number of doors',
            'postcode.required' => 'Please enter the postcode',
        ];
    }
}
