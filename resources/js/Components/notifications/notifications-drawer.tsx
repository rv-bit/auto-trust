import { useNotifications } from "@/providers/NotificationsProvider";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import { RefreshCw } from "lucide-react";

interface NotificationsDrawerProps {
	trigger?: React.ReactNode;
}

export default function NotificationsDrawer({ trigger }: NotificationsDrawerProps) {
	const { notifications, unreadCount, markSeen, markAllSeen, refresh, notificationsModalOpen, setNotificationsModalOpen } = useNotifications();

	console.log("NotificationsDrawer render - notifications:", notifications, "unreadCount:", unreadCount);

	return (
		<Sheet open={notificationsModalOpen} onOpenChange={setNotificationsModalOpen}>
			{trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}

			<SheetContent className="w-full rounded-tl-sm rounded-bl-sm bg-white data-[vaul-drawer-direction=right]:w-full data-[vaul-drawer-direction=right]:sm:max-w-5xl dark:bg-white">
				<SheetHeader className="flex items-start justify-start gap-2 border-b border-gray-200">
					<span className="flex w-full flex-col items-start justify-between">
						<SheetTitle className="text-left text-lg font-medium text-gray-900 dark:text-gray-100">Notifications</SheetTitle>
						<SheetDescription className="text-left text-sm text-gray-600 dark:text-gray-400">
							{notifications.length === 0 ? "No notifications yet." : `You have ${unreadCount} unread notifications.`}
						</SheetDescription>
					</span>

					<Button variant="ghost" size="icon" className="size-8" onClick={() => refresh()} title="Refresh notifications">
						<RefreshCw className="size-4" />
					</Button>

					{unreadCount > 0 && (
						<Button variant="link" className="p-0 text-sm" onClick={() => markAllSeen()}>
							Mark all as seen
						</Button>
					)}
				</SheetHeader>
				<div className="p-4">
					{notifications.length === 0 ? (
						<p className="text-muted-foreground py-8 text-center text-sm">No notifications to display.</p>
					) : (
						<ul className="max-h-96 space-y-2 overflow-auto">
							{notifications.map((n) => (
								<li key={n.id} className={`rounded border p-3 ${n.read_at ? "border-gray-200 bg-gray-50" : "border-blue-200 bg-blue-50"}`}>
									<div className="flex flex-col gap-1">
										<span className="text-sm font-medium">{n.data?.snippet ?? n.data?.message ?? "New notification"}</span>
										{n.data && Object.keys(n.data).length > 1 && <span className="text-muted-foreground text-xs">{JSON.stringify(n.data)}</span>}
										<div className="mt-1 flex items-center justify-between">
											<span className="text-muted-foreground text-xs">{new Date(n.created_at).toLocaleString()}</span>
											{!n.read_at && (
												<Button variant="link" className="h-auto p-0 text-xs" onClick={() => markSeen(n.id)}>
													Mark as read
												</Button>
											)}
										</div>
									</div>
								</li>
							))}
						</ul>
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
}
