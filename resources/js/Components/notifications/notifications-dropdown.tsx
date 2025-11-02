import { useNotifications } from "@/providers/NotificationsProvider";

export default function NotificationsDropdown() {
	const { notifications, unreadCount, markSeen, markAllSeen } = useNotifications();

	return (
		<div className="relative">
			<button className="px-2 py-1">Notifications ({unreadCount})</button>
			<div className="absolute right-0 z-50 mt-2 w-80 rounded border bg-white p-2 shadow-lg">
				<div className="mb-2 flex items-center justify-between">
					<strong>Notifications</strong>
					<button className="text-sm" onClick={() => markAllSeen()}>
						Mark all seen
					</button>
				</div>
				<ul className="max-h-64 space-y-2 overflow-auto">
					{notifications.map((n) => (
						<li key={n.id} className={`rounded p-2 ${n.read_at ? "bg-gray-50" : "bg-white"}`}>
							<div className="text-sm">{n.data?.snippet ?? JSON.stringify(n.data)}</div>
							<div className="text-muted text-xs">{new Date(n.created_at).toLocaleString()}</div>
							{!n.read_at && (
								<button className="text-primary mt-1 text-xs" onClick={() => markSeen(n.id)}>
									Mark seen
								</button>
							)}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
