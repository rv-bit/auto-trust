<?php

namespace App\Enum;

enum VehicleConditionEnum: string
{
    case New = 'new';
    case NearlyNew = 'nearly-new';
    case Used = 'used';

    public function label(): string
    {
        return match ($this) {
            self::New => 'New',
            self::NearlyNew => 'Nearly New',
            self::Used => 'Used',
        };
    }

    public static function labels(): array
    {
        return [
            self::New->value => self::New->label(),
            self::NearlyNew->value => self::NearlyNew->label(),
            self::Used->value => self::Used->label(),
        ];
    }
}
