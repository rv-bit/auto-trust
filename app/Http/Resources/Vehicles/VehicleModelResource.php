<?php

namespace App\Http\Resources\Vehicles;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VehicleModelResource extends JsonResource
{
    public static $wrap = false; 

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'make_id' => $this->make_id,
            'name' => $this->name,
            'slug' => $this->slug,
        ];
    }
}