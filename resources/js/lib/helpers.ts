export const formatMessageDateLong = (date: Date | string) => {
    const now = new Date();
    const inputDate = new Date(date);

    if (isToday(inputDate)) {
        return inputDate.toLocaleDateString([], {
            hour: "2-digit",
            minute: "2-digit"
        })
    } else if (isYesterday(inputDate)) {
        const dateString = inputDate.toLocaleDateString([], {
            hour: "2-digit",
            minute: "2-digit"
        })

        return `Yesterday ${dateString}`
    } else if (inputDate.getFullYear() === now.getFullYear()) {
        return inputDate.toLocaleDateString([], {
            day: "2-digit",
            month: "short"
        })
    } else {
        return inputDate.toLocaleDateString()
    }
}

export const formatMessageDateShort = (date: Date | string) => {
    const now = new Date();
    const inputDate = new Date(date);

    if (isToday(inputDate)) {
        return inputDate.toLocaleDateString([], {
            hour: "2-digit",
            minute: "2-digit"
        })
    } else if (isYesterday(inputDate)) {
        return `Yesterday`
    } else if (inputDate.getFullYear() === now.getFullYear()) {
        return inputDate.toLocaleDateString([], {
            day: "2-digit",
            month: "short"
        })
    } else {
        return inputDate.toLocaleDateString()
    }
}

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