import axios, { AxiosResponse } from "axios";
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
	notificationsModalOpen: boolean;
	setNotificationsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

interface NotificationResponse extends AxiosResponse {
	data: NotificationType[];
}

export function NotificationsProvider({ children, initialPage }: { children: React.ReactNode; initialPage?: any }) {
	const [notificationsModalOpen, setNotificationsModalOpen] = useState(false);
	const [notifications, setNotifications] = useState<NotificationType[]>([]);

	const fetchNotifications = async () => {
		const userId = initialPage?.props?.auth?.user?.id;
		if (!userId) return;

		try {
			const res = await axios.get(notificationsRoutes.index().url);
			// Laravel resource collections return data in a 'data' property
			// But if paginated, the structure is { data: [...], links: {...}, meta: {...} }
			const notificationsData = res.data.data ?? res.data;
			setNotifications(Array.isArray(notificationsData) ? notificationsData : []);
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

			// Listen for the BroadcastNotificationCreated event
			// Laravel sends this event with a specific structure
			channel.listen(".Illuminate\\Notifications\\Events\\BroadcastNotificationCreated", (e: any) => {
				// The event structure from Laravel is:
				// { id, type, data: {...}, read_at, created_at }
				// We need to construct a proper notification object
				const notification: NotificationType = {
					id: e.id,
					type: e.type,
					data: e.data || {},
					read_at: e.read_at || null,
					created_at: e.created_at || new Date().toISOString(),
				};

				setNotifications((prev) => {
					const updated = [notification, ...prev];
					return updated;
				});
			});

			return () => {
				if (Echo?.leave) {
					Echo.leave(channelName);
				}
			};
		} catch (err) {
			console.error("Echo setup error:", err);
		}
	}, []);

	const markSeen = async (id: string) => {
		try {
			await axios.post(notificationsRoutes.markSeen.post(id).url);
			setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read_at: new Date().toISOString() } : n)));
		} catch (e) {
			console.error("Failed to mark notification seen", e);
		}
	};

	const markAllSeen = async () => {
		try {
			await axios.post(notificationsRoutes.markAllSeen().url);
			setNotifications((prev) => prev.map((n) => ({ ...n, read_at: new Date().toISOString() })));
		} catch (e) {
			console.error("Failed to mark all seen", e);
		}
	};

	const unreadCount = notifications.filter((n) => !n.read_at).length;

	return (
		<NotificationsContext.Provider value={{ notifications, unreadCount, markSeen, markAllSeen, refresh: fetchNotifications, notificationsModalOpen, setNotificationsModalOpen }}>
			{children}
		</NotificationsContext.Provider>
	);
}

export function useNotifications() {
	const ctx = useContext(NotificationsContext);
	if (!ctx) throw new Error("useNotifications must be used within NotificationsProvider");
	return ctx;
}
