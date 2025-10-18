<?php

namespace Database\Seeders;

use App\Models\Vehicles\VehicleMake;
use App\Models\Vehicles\VehicleModel;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class VehicleModelSeeder extends Seeder
{
    public function run(): void
    {
        $models = [
            'Toyota' => ['Corolla', 'Camry', 'Prius', 'RAV4', 'Highlander', 'Land Cruiser', 'Yaris', 'Auris'],
            'Honda' => ['Civic', 'Accord', 'CR-V', 'Pilot', 'Jazz', 'HR-V', 'Odyssey', 'Fit'],
            'Ford' => ['Focus', 'Fiesta', 'Mondeo', 'Mustang', 'Explorer', 'Edge', 'Ranger', 'Transit'],
            'BMW' => ['3 Series', '5 Series', '7 Series', 'X1', 'X3', 'X5', 'M3', 'M5', 'i3'],
            'Mercedes-Benz' => ['A-Class', 'C-Class', 'E-Class', 'S-Class', 'GLA', 'GLC', 'GLE', 'G-Class'],
            'Audi' => ['A1', 'A3', 'A4', 'A6', 'Q3', 'Q5', 'Q7', 'RS3', 'RS5'],
            'Volkswagen' => ['Golf', 'Polo', 'Passat', 'Tiguan', 'Touareg', 'Beetle', 'Jetta', 'Arteon'],
            'Nissan' => ['Qashqai', 'X-Trail', 'Altima', 'Maxima', 'Leaf', 'Micra', 'Juke', '370Z'],
            'Hyundai' => ['i10', 'i20', 'i30', 'Elantra', 'Tucson', 'Santa Fe', 'Kona', 'Ioniq'],
            'Kia' => ['Picanto', 'Rio', 'Ceed', 'Sportage', 'Sorento', 'Niro', 'EV6', 'Telluride'],
            'Mazda' => ['Mazda2', 'Mazda3', 'Mazda6', 'CX-3', 'CX-5', 'CX-9', 'MX-5', 'RX-8'],
            'Subaru' => ['Impreza', 'Legacy', 'Outback', 'Forester', 'Crosstrek', 'BRZ', 'WRX', 'Ascent'],
            'Lexus' => ['IS', 'ES', 'LS', 'NX', 'RX', 'GX', 'LX', 'CT'],
            'Jaguar' => ['XE', 'XF', 'XJ', 'F-Type', 'F-Pace', 'I-Pace'],
            'Land Rover' => ['Defender', 'Discovery', 'Discovery Sport', 'Range Rover', 'Range Rover Sport', 'Range Rover Evoque'],
            'Volvo' => ['S60', 'S90', 'V60', 'V90', 'XC40', 'XC60', 'XC90', 'Polestar'],
            'Peugeot' => ['108', '208', '308', '3008', '5008', '2008', '208 GT', '308 GTi'],
            'Renault' => ['Clio', 'Megane', 'Scenic', 'Captur', 'Kadjar', 'Espace', 'Koleos', 'Talisman'],
            'Fiat' => ['500', 'Panda', 'Tipo', '500X', 'Bravo', 'Punto', 'Doblo', 'Ducato'],
            'Alfa Romeo' => ['MiTo', 'Giulietta', 'Giulia', 'Stelvio', '4C', '147', 'GT', 'Brera'],
            'Porsche' => ['911', 'Cayman', 'Boxster', 'Panamera', 'Cayenne', 'Macan', 'Taycan'],
            'Tesla' => ['Model S', 'Model 3', 'Model X', 'Model Y', 'Roadster', 'Cybertruck'],
            'Chevrolet' => ['Spark', 'Cruze', 'Malibu', 'Silverado', 'Equinox', 'Traverse', 'Corvette', 'Camaro'],
            'GMC' => ['Sierra', 'Acadia', 'Terrain', 'Yukon', 'Canyon', 'Savana'],
            'Jeep' => ['Wrangler', 'Cherokee', 'Grand Cherokee', 'Renegade', 'Compass', 'Gladiator'],
            'Ram' => ['1500', '2500', '3500', 'ProMaster', 'Rebel', 'Laramie'],
            'Dodge' => ['Charger', 'Challenger', 'Durango', 'Journey', 'Hornet'],
            'Cadillac' => ['CTS', 'CT4', 'CT5', 'Escalade', 'XT5', 'XT6'],
        ];

        foreach ($models as $makeName => $modelNames) {
            $make = VehicleMake::where('name', $makeName)->first();

            if ($make) {
                foreach ($modelNames as $modelName) {
                    VehicleModel::firstOrCreate([
                        'make_id' => $make->id,
                        'name' => $modelName,
                        'slug' => Str::slug($modelName),
                    ]);
                }
            }
        }
    }
}
