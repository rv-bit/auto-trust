export const formatMessageDateLong = (date: Date | string) => {
	const now = new Date();
	const inputDate = new Date(date);

	if (isToday(inputDate)) {
		const dateString = inputDate.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		});

		return `${dateString}`;
	} else if (isYesterday(inputDate)) {
		const dateString = inputDate.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		});

		return `Yesterday at ${dateString}`;
	} else if (inputDate.getFullYear() === now.getFullYear()) {
		return inputDate.toLocaleDateString([], {
			day: "2-digit",
			month: "short",
		});
	} else {
		return inputDate.toLocaleDateString();
	}
};

export const formatMessageDateShort = (date: Date | string) => {
	const now = new Date();
	const inputDate = new Date(date);

	if (isToday(inputDate)) {
		const dateString = inputDate.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		});

		return `${dateString}`;
	} else if (isYesterday(inputDate)) {
		const dateString = inputDate.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		});

		return `Yesterday at ${dateString}`;
	} else if (inputDate.getFullYear() === now.getFullYear()) {
		return inputDate.toLocaleDateString([], {
			day: "2-digit",
			month: "short",
		});
	} else {
		return inputDate.toLocaleDateString();
	}
};

const isToday = (date: Date) => {
    const today = new Date();
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
}

const isYesterday = (date: Date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    return (
        date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear()
    );
}