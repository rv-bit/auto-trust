import { AxiosResponse } from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

import notificationsRoutes from "@/routes/notifications";

type NotificationType = {
	id: string;
	type: string;
	data: any;
	read_at: string | null;
	created_at: string;
};

type NotificationsContextType = {
	notifications: NotificationType[];
	unreadCount: number;
	markSeen: (id: string) => Promise<void>;
	markAllSeen: () => Promise<void>;
	refresh: () => Promise<void>;
};

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

interface NotificationResponse extends AxiosResponse {
	data: NotificationType[];
}

export function NotificationsProvider({ children, initialPage }: { children: React.ReactNode; initialPage?: any }) {
	const [notifications, setNotifications] = useState<NotificationType[]>([]);

	const fetchNotifications = async () => {
		const userId = initialPage?.props?.auth?.user?.id;
		if (!userId) return;

		const axios = window.axios;
		try {
			const res = await axios.get<NotificationResponse>(notificationsRoutes.index().url);
			setNotifications(res.data.data ?? []);
		} catch (e) {
			console.error("Failed to load notifications", e);
		}
	};

	useEffect(() => {
		fetchNotifications();

		const Echo = window.Echo;
		try {
			const userId = initialPage?.props?.auth?.user?.id;
			if (!userId) {
				return;
			}

			const channelName = "notification.user." + userId;
			const channel = Echo.private(channelName);
			// Use Echo.notification which listens for notification broadcasts
			if (channel && typeof channel.notification === "function") {
				channel.notification((payload: any) => {
					// payload is the notification object
					setNotifications((prev) => [payload, ...prev]);
				});
			} else {
				// fallback: listen for any event
				channel.listen(".Illuminate\\Notifications\\Events\\BroadcastNotificationCreated", (e: any) => {
					const payload = e?.notification;
					if (payload) {
						setNotifications((prev) => [payload, ...prev]);
					}
				});
			}

			return () => {
				if (Echo?.leave) {
					Echo.leave(channelName);
				}
			};
		} catch (err) {
			// ignore
		}
	}, []);

	const markSeen = async (id: string) => {
		const axios = window.axios;
		try {
			await axios.post(notificationsRoutes.markSeen.post(id).url);
			setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read_at: new Date().toISOString() } : n)));
		} catch (e) {
			console.error("Failed to mark notification seen", e);
		}
	};

	const markAllSeen = async () => {
		const axios = window.axios;
		try {
			await axios.post(notificationsRoutes.markAllSeen().url);
			setNotifications((prev) => prev.map((n) => ({ ...n, read_at: new Date().toISOString() })));
		} catch (e) {
			console.error("Failed to mark all seen", e);
		}
	};

	const unreadCount = notifications.filter((n) => !n.read_at).length;

	return <NotificationsContext.Provider value={{ notifications, unreadCount, markSeen, markAllSeen, refresh: fetchNotifications }}>{children}</NotificationsContext.Provider>;
}

export function useNotifications() {
	const ctx = useContext(NotificationsContext);
	if (!ctx) throw new Error("useNotifications must be used within NotificationsProvider");
	return ctx;
}
