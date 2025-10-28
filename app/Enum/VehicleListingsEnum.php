<?php

namespace App\Enum;

enum VehicleListingsEnum: string
{
    case Used = 'used-cars';
    case New = 'new-cars';

    public static function labels(): array
    {
        return [
            self::Used->value => 'Used',
            self::New->value => 'New',
        ];
    }

    public function label()
    {
        return match ($this) {
            self::Used => 'Used',
            self::New => 'New',
        };
    }
}
