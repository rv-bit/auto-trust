<?php

namespace Database\Seeders;

use App\Models\User;

use App\Models\Chat\Message;
use App\Models\Chat\Conversation;

use App\Enum\RolesEnum;
use App\Enum\PermissionsEnum;

use Carbon\Carbon;

use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $customerRole = Role::create(['name' => RolesEnum::Customer->value]);
        $adminRole = Role::create(['name' => RolesEnum::Admin->value]);

        $manageVehiclesPermission = Permission::create([
            'name' => PermissionsEnum::ManageVehicles->value,
        ]);
        $manageUsersPermission = Permission::create([
            'name' => PermissionsEnum::ManageUsers->value,
        ]);

        $adminRole->syncPermissions([
            $manageUsersPermission,
            $manageVehiclesPermission
        ]);

        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'is_admin' => true,
            'password' => bcrypt('password'),
        ])->assignRole(RolesEnum::Admin);

        User::factory(10)->create();

        Message::factory(1000)->create();
        $messages = Message::whereNotNull('receiver_id')->orderBy('created_at')->get();
        $conversations = $messages->groupBy(function ($message) {
            return collect([$message->sender_id, $message->receiver_id])->sort()->implode('_');
        })->map(function ($groupedMessages) {
            return [
                'user_id1' => $groupedMessages->first()->sender_id,
                'user_id2' => $groupedMessages->first()->receiver_id,
                'last_message_id' => $groupedMessages->last()->id,

                'created_at' => new Carbon(),
                'updated_at' => new Carbon(),
            ];
        })->values();

        Conversation::insertOrIgnore($conversations->toArray());

        // Seed vehicle makes and models
        $this->call([
            VehicleMakeSeeder::class,
            VehicleModelSeeder::class,
        ]);

        // Create sample vehicles
        $this->call(VehicleSeeder::class);
    }
}
