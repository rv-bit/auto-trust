import Auth from './Auth'
import Vehicles from './Vehicles'
import Settings from './Settings'

const Controllers = {
    Auth: Object.assign(Auth, Auth),
    Vehicles: Object.assign(Vehicles, Vehicles),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers