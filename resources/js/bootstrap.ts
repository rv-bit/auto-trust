import axios from "axios";
window.axios = axios;

var socketId = window.Echo.socketId();

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
window.axios.defaults.headers.common["X-Socket-ID"] = socketId;

window.axios.defaults.withCredentials = true;
