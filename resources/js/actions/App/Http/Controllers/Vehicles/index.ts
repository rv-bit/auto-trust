import VehicleMakeController from './VehicleMakeController'
import VehicleModelController from './VehicleModelController'
import VehicleController from './VehicleController'

const Vehicles = {
    VehicleMakeController: Object.assign(VehicleMakeController, VehicleMakeController),
    VehicleModelController: Object.assign(VehicleModelController, VehicleModelController),
    VehicleController: Object.assign(VehicleController, VehicleController),
}

export default Vehicles