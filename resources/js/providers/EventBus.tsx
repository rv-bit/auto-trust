import * as React from "react";

type Callback<T = any> = (data: T) => void;

type EventBus = {
	emit: (name: string, data: any) => void;
	on: (name: string, cb: Callback) => () => void;
};
type Events = Record<string, Callback[]>;

export const EventBusContext = React.createContext<EventBus | null>(null);

export const useEventBus = () => {
	const context = React.useContext(EventBusContext);
	if (!context) {
		throw new Error("useEventBus must be used within a EventBusProvider.");
	}

	return context;
};

export const EventBusProvider = ({ children }: React.PropsWithChildren) => {
	const [events, setEvents] = React.useState<Events>({});

	const emit = (name: string, data: any) => {
		if (events[name]) {
			for (let cb of events[name]) {
				cb(data);
			}
		}
	};

	const on = (name: string, cb: Callback<any>) => {
		setEvents((prev) => {
			const updated = { ...prev };
			if (!updated[name]) {
				updated[name] = [];
			}
			updated[name].push(cb);
			return updated;
		});

		return () => {
			setEvents((prev) => {
				const updated = { ...prev };
				updated[name] = updated[name]?.filter((callback) => callback !== cb) || [];
				return updated;
			});
		};
	};

	return <EventBusContext.Provider value={{ emit, on }}>{children}</EventBusContext.Provider>;
};
