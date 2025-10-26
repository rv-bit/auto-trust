import type { UserResource } from "@/types/routes/chat";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type Users = Record<number, UserResource>;

interface OnlineUsersContextType {
	onlineUsers: Users;
	isUserOnline: (userId: number) => boolean;
}

const OnlineUsersContext = createContext<OnlineUsersContextType | undefined>(undefined);

export function OnlineUsersProvider({ children }: { children: ReactNode }) {
	const [onlineUsers, setOnlineUsers] = useState<Users>({});

	useEffect(() => {
		const Echo = window.Echo;

		const channel = Echo.join("online")
			.here((users: UserResource[]) => {
				const onlineUsersObj = Object.fromEntries(users.map((user) => [user.id, user]));
				setOnlineUsers(onlineUsersObj);
			})
			.joining((user: UserResource) => {
				setOnlineUsers((prev) => ({ ...prev, [user.id]: user }));
			})
			.leaving((user: UserResource) => {
				setOnlineUsers((prev) => {
					const updated = { ...prev };
					delete updated[user.id];
					return updated;
				});
			})
			.error((error: unknown) => {
				console.error("Echo error:", error);
			});

		return () => {
			Echo.leave("online");
		};
	}, []);

	const isUserOnline = (userId: number) => !!onlineUsers[userId];

	return <OnlineUsersContext.Provider value={{ onlineUsers, isUserOnline }}>{children}</OnlineUsersContext.Provider>;
}

export function useOnlineUsers() {
	const context = useContext(OnlineUsersContext);
	if (!context) {
		throw new Error("useOnlineUsers must be used within OnlineUsersProvider");
	}
	return context;
}
