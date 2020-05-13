export function priceFormat(value) {
    const roundedValue = Math.round(value);
    return roundedValue.toLocaleString('ru-RU').replace(/\s/g, '\u2009');
}

export function roundValue(value) {
    return Math.round(value);
}

export function numConversion(number, words) {
    const textCases = [2, 0, 1, 1, 1, 2];
    const textInt = number % 100 > 4 && number % 100 < 20 ? 2 : textCases[Math.min(number % 10, 5)];
    return words[textInt];
}

export function removeItem(array, item) {
    return array.filter((current) => current !== item);
}

export function addItemIfNotExists(array, item) {
    return array.includes(item) ? array : array.concat(item);
}

export function removeProperty(object, property) {
    const result = { ...object };
    delete result[property];
    return result;
}
