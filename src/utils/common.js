export function priceFormat(value) {
    const roundedValue = Math.round(value);
    return roundedValue.toLocaleString('ru-RU');
}

export function dateFormat(date) {
    return date.toLocaleDateString('ru-RU');
}

export function calcPercent(sum, percent) {
    // пока это не точный рассчет процентов. Надо делить на 365 и умножать на количество дней в месяце
    return (sum * (percent / 100)) / 12;
}

export function numConversion(number, words) {
    const textCases = [2, 0, 1, 1, 1, 2];
    const textInt = number % 100 > 4 && number % 100 < 20 ? 2 : textCases[Math.min(number % 10, 5)];
    return words[textInt];
}

export function roundMoney(value) {
    return Math.round(value * 100) / 100;
}
