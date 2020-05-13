/* eslint-disable import/prefer-default-export */
export function calculatePercentage(value, base) {
    return Math.round((value / base) * 10000) / 100;
}
