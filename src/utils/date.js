const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;

// возвращает объект даты с установленным временем 00:00:00
export const normalizeDate = (date) => {
    const resultDate = new Date(date);
    resultDate.setUTCHours(0, 0, 0, 0);
    return resultDate;
};

export const formatDateISO = (date) => date.toISOString().substr(0, 10);

export const formatDate = (date) => {
    const strDate = formatDateISO(date);
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
