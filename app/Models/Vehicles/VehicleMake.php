<?php

namespace App\Models\Vehicles;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class VehicleMake extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'logo_url',
    ];

    protected $hidden = [];

    public function models(): HasMany
    {
        return $this->hasMany(VehicleModel::class, 'make_id');
    }

    public function vehicles(): HasMany
    {
        return $this->hasMany(Vehicle::class, 'make_id');
    }
}
