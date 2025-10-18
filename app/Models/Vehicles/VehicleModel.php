<?php

namespace App\Models\Vehicles;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class VehicleModel extends Model
{
    protected $table = 'vehicle_models';

    protected $fillable = [
        'make_id',
        'name',
        'slug',
    ];

    protected $hidden = [];

    public function make(): BelongsTo
    {
        return $this->belongsTo(VehicleMake::class, 'make_id');
    }

    public function vehicles(): HasMany
    {
        return $this->hasMany(Vehicle::class, 'model_id');
    }
}
