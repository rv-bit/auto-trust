import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import React from "react";
import ReactDOMServer from "react-dom/server";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Axios from "axios";
import { client } from "laravel-precognition-react";

import { configureEcho } from "@laravel/echo-react";

import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { NotificationsProvider } from "./providers/NotificationsProvider";

import { Toaster } from "./components/ui/sooner";
import Sprites from "./icons/sprites";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5, // 5 minutes
			gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
			retry: 1,
			refetchOnWindowFocus: false,
			// refetchOnMount: "stale",
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
	key: import.meta.env.VITE_REVERB_APP_KEY, // optional, depending on config
	wsHost: import.meta.env.VITE_REVERB_HOST,
	wsPort: import.meta.env.VITE_REVERB_PORT,
	forceTLS: false,
	enabledTransports: ["ws", "wss"],
	authEndpoint: "/broadcasting/auth",
	auth: {
		headers: {
			"X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "",
		},
	},
});

configureEcho({
	broadcaster: "reverb",
});

window.axios = Axios.create();
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
window.axios.defaults.withCredentials = true;
client.use(window.axios);

createServer((page) =>
	createInertiaApp({
		page,
		render: ReactDOMServer.renderToString,
		title: (title) => (title ? `${title} | ${appName}` : appName),
		resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob("./pages/**/*.tsx")),
		setup: ({ App, props }) => {
			return (
				<React.Fragment>
					<Sprites />

					<QueryClientProvider client={queryClient}>
						<NotificationsProvider initialPage={props}>
							<App {...props} />
						</NotificationsProvider>
					</QueryClientProvider>
					<Toaster />
				</React.Fragment>
			);
		},
	}),
);
