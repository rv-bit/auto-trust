import Auth from './Auth'
import Vehicles from './Vehicles'
import Settings from './Settings'
import Chat from './Chat'

const Controllers = {
    Auth: Object.assign(Auth, Auth),
    Vehicles: Object.assign(Vehicles, Vehicles),
    Settings: Object.assign(Settings, Settings),
    Chat: Object.assign(Chat, Chat),
}

export default Controllers