import VehicleController from './VehicleController'
import VehicleMakeController from './VehicleMakeController'
import VehicleModelController from './VehicleModelController'

const Vehicles = {
    VehicleController: Object.assign(VehicleController, VehicleController),
    VehicleMakeController: Object.assign(VehicleMakeController, VehicleMakeController),
    VehicleModelController: Object.assign(VehicleModelController, VehicleModelController),
}

export default Vehicles