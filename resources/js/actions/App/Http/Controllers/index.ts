import Auth from './Auth'
import Vehicles from './Vehicles'
import Settings from './Settings'
import Chat from './Chat'
import NotificationController from './NotificationController'

const Controllers = {
    Auth: Object.assign(Auth, Auth),
    Vehicles: Object.assign(Vehicles, Vehicles),
    Settings: Object.assign(Settings, Settings),
    Chat: Object.assign(Chat, Chat),
    NotificationController: Object.assign(NotificationController, NotificationController),
}

export default Controllers