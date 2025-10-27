<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'data',
        'seen_at',
    ];

    protected $casts = [
        'data' => 'array',
        'seen_at' => 'datetime',
    ];

    public function notifiable(): MorphTo
    {
        return $this->morphTo();
    }

    public function scopeUnseen($query)
    {
        return $query->whereNull('seen_at');
    }

    public function markAsSeen(): bool
    {
        $this->seen_at = now();
        return $this->save();
    }
}
