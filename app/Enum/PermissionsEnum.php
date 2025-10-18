<?php

namespace App\Enum;

enum PermissionsEnum: string
{
    case ManageVehicles = 'manage_vehicles';
    case ManageUsers = 'manage_users';
}
