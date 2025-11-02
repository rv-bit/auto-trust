<?php

namespace App\Models\Vehicles;

use App\Models\User;

use App\Services\GeocodeService;
use Illuminate\Support\Facades\Auth;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Log;

class Vehicle extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'make_id',
        'model_id',
        'seller_id',
        'body_style',
        'fuel_type',
        'gearbox',
        'color',
        'year',
        'mileage',
        'price',
        'doors',
        'seats',
        'boot_space',
        'engine',
        'latitude',
        'longitude',
        'postcode',
        'extras',
        'specification',
        'safety_rating',
        'images',
        'status',
        'condition',
    ];

    protected $casts = [
        'extras' => 'json',
        'specification' => 'json',
        'images' => 'json',
        'year' => 'integer',
        'mileage' => 'integer',
        'price' => 'integer',
        'doors' => 'integer',
        'seats' => 'integer',
        'safety_rating' => 'integer',
        'latitude' => 'float',
        'longitude' => 'float',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    protected $appends = [];

    protected $hidden = ['deleted_at'];

    // ============ Relationships ============

    public function make(): BelongsTo
    {
        return $this->belongsTo(VehicleMake::class, 'make_id');
    }

    public function model(): BelongsTo
    {
        return $this->belongsTo(VehicleModel::class, 'model_id');
    }

    public function seller(): BelongsTo
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    // ============ Scopes ============

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeByMake($query, $makeId)
    {
        return $query->where('make_id', $makeId);
    }

    public function scopeByModel($query, $modelId)
    {
        return $query->where('model_id', $modelId);
    }

    public function scopeByBodyStyle($query, array $styles)
    {
        return $query->whereIn('body_style', $styles);
    }

    public function scopeByCondition($query, string $condition)
    {
        return $query->where('condition', $condition);
    }

    public function scopeByFuelType($query, array $fuelTypes)
    {
        return $query->whereIn('fuel_type', $fuelTypes);
    }

    public function scopeByColor($query, array $colors)
    {
        return $query->whereIn('color', $colors);
    }

    public function scopeByGearbox($query, array $gearboxes)
    {
        return $query->whereIn('gearbox', $gearboxes);
    }

    public function scopePriceRange($query, ?int $min, ?int $max)
    {
        if ($min) {
            $query->where('price', '>=', $min);
        }
        if ($max) {
            $query->where('price', '<=', $max);
        }
        return $query;
    }

    public function scopeYearRange($query, int $from, int $to)
    {
        return $query->whereBetween('year', [$from, $to]);
    }

    public function scopeMileageRange($query, ?int $min, ?int $max)
    {
        if ($min) {
            $query->where('mileage', '>=', $min);
        }
        if ($max) {
            $query->where('mileage', '<=', $max);
        }
        return $query;
    }

    public function scopeNearPostcode($query, string $postcode, int $radius = 50)
    {
        $geocodeService = app(GeocodeService::class);
        $coordinates = $geocodeService->getCoordinatesFromPostcode($postcode);
        
        if (!$coordinates) {
            Log::error('Failed to geocode postcode: ' . $postcode);
            return $query->whereRaw('1 = 0');
        }

        if (!$coordinates['latitude'] || !$coordinates['longitude']) {
            Log::error('Invalid coordinates for postcode: ' . $postcode . ', coords: ' . json_encode($coordinates));
            return $query->whereRaw('1 = 0');
        }

        Log::info('Geocoded search postcode ' . $postcode . ' to coordinates: ' . json_encode($coordinates));

        // Calculate bounding box for better performance
        $lat = $coordinates['latitude'];
        $lng = $coordinates['longitude'];
        
        // Convert radius to degrees (approximate, works for most of UK)
        $milesPerDegree = 69;  // rough approximation
        $degreeDelta = $radius / $milesPerDegree;
        
        // Create a square bounding box first (faster than calculating distance for all points)
        $query->whereNotNull('latitude')
            ->whereNotNull('longitude')
            ->whereBetween('latitude', [$lat - $degreeDelta, $lat + $degreeDelta])
            ->whereBetween('longitude', [$lng - $degreeDelta, $lng + $degreeDelta]);

        // Then apply precise distance calculation
        // Note: 3959 is Earth's radius in miles
        $distanceFormula = "
            (3959 * acos(
                cos(radians(?)) * 
                cos(radians(latitude)) * 
                cos(radians(longitude) - radians(?)) + 
                sin(radians(?)) * 
                sin(radians(latitude))
            ))
        ";
        
        return $query->whereRaw(
            "{$distanceFormula} <= ?", 
            [$lat, $lng, $lat, $radius]
        );
    }

    public function scopeWithSpecification($query, array $specs)
    {
        foreach ($specs as $spec => $value) {
            if ($value) {
                $query->whereJsonPath('specification->' . $spec, true);
            }
        }
        return $query;
    }

    public function scopeWithExtras($query, array $extras)
    {
        foreach ($extras as $extra => $value) {
            if ($value) {
                $query->whereJsonPath('extras->' . $extra, true);
            }
        }
        return $query;
    }

    // ============ Mutators ============

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (Auth::check()) {
                $model->seller_id = Auth::id();
            }
        });
    }

    // ============ Methods ============

    public function markAsSold(): bool
    {
        return $this->update(['status' => 'sold']);
    }

    public function markAsInactive(): bool
    {
        return $this->update(['status' => 'inactive']);
    }

    public function activate(): bool
    {
        return $this->update(['status' => 'active']);
    }

    public function isSold(): bool
    {
        return $this->status === 'sold';
    }

    public function isActive(): bool
    {
        return $this->status === 'active';
    }

    public function toArray()
    {
        $array = parent::toArray();

        if ($this->make) {
            $array['make'] = $this->make->toArray();
        }
        if ($this->model) {
            $array['model'] = $this->model->toArray();
        }

        return $array;
    }
}
