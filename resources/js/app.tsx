import "../css/app.css";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";

import { initializeTheme } from "./hooks/use-appearance";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Axios from "axios";
import { client } from "laravel-precognition-react";

import { configureEcho } from "@laravel/echo-react";

import Echo from "laravel-echo";
import Pusher from "pusher-js";
import React from "react";
import { Toaster } from "./components/ui/sooner";

import { NotificationsProvider } from "./providers/NotificationsProvider";
import Sprites from "./icons/sprites";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5,
			gcTime: 1000 * 60 * 10,
			retry: 1,
			refetchOnWindowFocus: false,
		},
		mutations: {
			retry: 1,
		},
	},
});

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

window.Pusher = Pusher;
window.Echo = new Echo({
	broadcaster: "reverb",
	key: import.meta.env.VITE_REVERB_APP_KEY,
	wsHost: import.meta.env.VITE_REVERB_HOST,
	wsPort: import.meta.env.VITE_REVERB_PORT,
	// wsPath: import.meta.env.VITE_REVERB_SERVER_PATH,
	forceTLS: import.meta.env.VITE_REVERB_SCHEME === "https",
	enabledTransports: ["ws", "wss"],
	authEndpoint: "/broadcasting/auth",
	auth: {
		headers: {
			"X-CSRF-TOKEN": document.querySelector('meta[name=\"csrf-token\"]')?.getAttribute("content") || "",
		},
	},
});

configureEcho({
	broadcaster: "reverb",
});

window.axios = Axios.create({
	withCredentials: true,
	withXSRFToken: true,
});
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
client.use(window.axios);

createInertiaApp({
	title: (title) => (title ? `${title} | ${appName}` : appName),
	resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob("./pages/**/*.tsx")),
	setup({ el, App, props }) {
		const root = createRoot(el);

		root.render(
			<React.Fragment>
				<Sprites />

				<QueryClientProvider client={queryClient}>
					<NotificationsProvider initialPage={props}>
						<App {...props} />
					</NotificationsProvider>
				</QueryClientProvider>
				<Toaster />
			</React.Fragment>,
		);
	},
	progress: {
		color: "#4B5563",
	},
});

initializeTheme();
