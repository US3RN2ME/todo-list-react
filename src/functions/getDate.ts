const currentDate = new Date();

const getWeekday = (date: Date = currentDate) => {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
};

const getDate = (date: Date = currentDate) => {
    return date.getDate();
};

const getMonth = (date: Date = currentDate) => {
    return date.toLocaleDateString('en-US', { month: 'short' });
};

const getTimeOfDay = (date: Date = currentDate) => {
    const hours = date.getHours();

    if (hours < 12) {
        return 'morning';
    } else if (hours < 18) {
        return 'afternoon';
    } else {
        return 'evening';
    }
};

export { getTimeOfDay, getDate, getMonth, getWeekday };
