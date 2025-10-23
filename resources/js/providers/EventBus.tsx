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
		if (!events[name]) {
			events[name] = [];
		}

		events[name].push(cb);

		return () => {
			events[name] = events[name].filter((callback) => callback !== cb);
		};
	};

	return <EventBusContext.Provider value={{ emit, on }}>{children}</EventBusContext.Provider>;
};
