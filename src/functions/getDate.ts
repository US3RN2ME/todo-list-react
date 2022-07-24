const date = new Date();

const getWeekday = () => {
    return date.toLocaleDateString(
        "en-US",
        { weekday: 'long'}
    );
}

const getDate = () => {
    return date.getDate();
}

const getMonth = () => {
    return date.toLocaleDateString(
        "en-US",
        { month: 'short'}
    );
}

const getTimeOfDay = () => {
    const hours = date.getHours();

    if (hours < 12) {
        return "morning";
    } else if (hours < 18) {
        return "afternoon";
    } else {
        return "evening";
    }
};

export {getTimeOfDay, getDate, getMonth, getWeekday}