const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;

export const formatDate = (date) => {
    const strDate = date.toISOString().substr(0, 10);
    const splittedDate = strDate.split('-');
    return `${splittedDate[2]}.${splittedDate[1]}.${splittedDate[0]}`;
};

export const getNextMonth = (date) => {
    const newDate = new Date(date);
    const day = date.getDate();
    newDate.setMonth(date.getMonth() + 1);
    if (newDate.getDate() !== day) {
        newDate.setDate(0);
    }
    return newDate;
};

export const getDaysCountInYear = (year) => {
    if (year % 4 === 0) {
        return 366;
    }
    return 365;
};

export const getDaysCountBetweenDates = (start, end) => (end - start) / MILLISECONDS_IN_DAY;
