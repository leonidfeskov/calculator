export function priceFormat(value) {
    const roundedValue = Math.round(value);
    return roundedValue.toLocaleString('ru-RU');
}

export function roundValue(value) {
    return Math.round(value);
}

export function numConversion(number, words) {
    const textCases = [2, 0, 1, 1, 1, 2];
    const textInt = number % 100 > 4 && number % 100 < 20 ? 2 : textCases[Math.min(number % 10, 5)];
    return words[textInt];
}
