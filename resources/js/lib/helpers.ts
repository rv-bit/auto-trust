export const formatMessageDate = (date: Date | string) => {
	const now = new Date();
	const inputDate = new Date(date);

	if (isToday(inputDate)) {
		return "Today";
	} else if (isYesterday(inputDate)) {
		return "Yesterday";
	} else if (isThisWeek(inputDate)) {
		return inputDate.toLocaleDateString("en-GB", {
			weekday: "long",
		});
	} else {
		return inputDate.toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});
	}
};

export const isToday = (date: Date) => {
	const today = new Date();
	return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
};

export const isYesterday = (date: Date) => {
	const yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);

	return date.getDate() === yesterday.getDate() && date.getMonth() === yesterday.getMonth() && date.getFullYear() === yesterday.getFullYear();
};

export const isThisWeek = (date: Date) => {
	const today = new Date();
	const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
	const lastDayOfWeek = new Date(today.setDate(firstDayOfWeek.getDate() + 6));

	return date >= firstDayOfWeek && date <= lastDayOfWeek;
};
