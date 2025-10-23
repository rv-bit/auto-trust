import "../css/app.css";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import { initializeTheme } from "./hooks/use-appearance";

import Axios from "axios";
import { client } from "laravel-precognition-react";

import { configureEcho } from "@laravel/echo-react";

import Echo from "laravel-echo";
import Pusher from "pusher-js";
import React from "react";

import { Toaster } from "./components/ui/sooner";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

window.Pusher = Pusher;
window.Echo = new Echo({
	broadcaster: "reverb",
	key: import.meta.env.VITE_REVERB_APP_KEY, // optional, depending on config
	wsHost: import.meta.env.VITE_REVERB_HOST,
	wsPort: import.meta.env.VITE_REVERB_PORT,
	forceTLS: false,
	enabledTransports: ["ws", "wss"],
});

configureEcho({
	broadcaster: "reverb",
});

window.axios = Axios.create();
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
window.axios.defaults.withCredentials = true;
client.use(window.axios);

createInertiaApp({
	title: (title) => (title ? `${title} - ${appName}` : appName),
	resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob("./pages/**/*.tsx")),
	setup({ el, App, props }) {
		const root = createRoot(el);

		root.render(
			// <App {...props} />
			<React.Fragment>
				<App {...props} />
				<Toaster />
			</React.Fragment>,
		);
	},
	progress: {
		color: "#4B5563",
	},
});

// This will set light / dark mode on load...
initializeTheme();
