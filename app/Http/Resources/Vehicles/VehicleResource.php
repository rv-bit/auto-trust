<?php

namespace App\Http\Resources\Vehicles;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VehicleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'make_id' => $this->make_id,
            'model_id' => $this->model_id,
            'seller_id' => $this->seller_id,
            'body_style' => $this->body_style,
            'fuel_type' => $this->fuel_type,
            'gearbox' => $this->gearbox,
            'color' => $this->color,
            'year' => $this->year,
            'mileage' => $this->mileage,
            'price' => $this->price,
            'doors' => $this->doors,
            'seats' => $this->seats,
            'boot_space' => $this->boot_space,
            'engine' => $this->engine,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'postcode' => $this->postcode,
            'extras' => $this->parseJson($this->extras),
            'specification' => $this->parseJson($this->specification),
            'safety_rating' => $this->safety_rating,
            'images' => $this->parseJson($this->images) ?? [],
            'status' => $this->status,
            'condition' => $this->condition,
            'created_at' => $this->created_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),
            'make' => $this->whenLoaded('make', function () {
                return [
                    'id' => $this->make->id,
                    'name' => $this->make->name,
                    'slug' => $this->make->slug,
                ];
            }),
            'model' => $this->whenLoaded('model', function () {
                return [
                    'id' => $this->model->id,
                    'name' => $this->model->name,
                    'slug' => $this->model->slug,
                ];
            }),
            'seller' => $this->whenLoaded('seller', function () {
                return [
                    'id' => $this->seller->id,
                    'name' => $this->seller->name,
                    'email' => $this->seller->email,
                    'avatar' => $this->seller->avatar,
                    'created_at' => $this->seller->created_at?->toISOString(),
                ];
            }),
        ];
    }

    /**
     * Parse JSON string to array/object
     * Handles both string JSON and already decoded data
     */
    private function parseJson($value)
    {
        if (is_null($value)) {
            return null;
        }

        // If it's already an array/object, return it
        if (is_array($value) || is_object($value)) {
            return $value;
        }

        // If it's a string, try to decode it
        if (is_string($value)) {
            $decoded = json_decode($value, true);
            return $decoded ?? $value;
        }

        return $value;
    }
}
