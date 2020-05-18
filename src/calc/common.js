/* eslint-disable import/prefer-default-export */
import { getDaysCountBetweenDates, getDaysCountInYear } from 'src/utils/date';

export function calculatePercentage(value, base) {
    return Math.round((value / base) * 10000) / 100;
}

export function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
}

export function calculateMoneyByPercentage(sum, percentage, startDate, endDate) {
    const daysCountInPreviousYear = getDaysCountInYear(startDate.getFullYear());
    const daysCountInCurrentYear = getDaysCountInYear(endDate.getFullYear());
    let paymentByPercents = 0;
    // Случай, когда одна часть платежного периода находится в невисокосном году, а вторая в високосном или наоборот
    // В таком случае стоимость одного дня кредита будет разной для каждой части
    if (startDate.getMonth() === 11 && endDate.getMonth() === 0 && daysCountInPreviousYear !== daysCountInCurrentYear) {
        const daysCountInPreviousMonth = getDaysCountBetweenDates(
            startDate,
            new Date(`${startDate.getFullYear()}-12-31`)
        );
        const daysCountInCurrentMonth = getDaysCountBetweenDates(new Date(`${startDate.getFullYear()}-12-31`), endDate);

        const oneDayCreditCostForPreviousMonth = (sum * percentage) / daysCountInPreviousYear;
        const oneDayCreditCostForCurrentMonth = (sum * percentage) / daysCountInCurrentYear;

        paymentByPercents =
            oneDayCreditCostForPreviousMonth * daysCountInPreviousMonth +
            oneDayCreditCostForCurrentMonth * daysCountInCurrentMonth;
    } else {
        // обычный случай
        const oneDayCreditCost = (sum * percentage) / daysCountInPreviousYear;
        paymentByPercents = oneDayCreditCost * getDaysCountBetweenDates(startDate, endDate);
    }

    return paymentByPercents;
}
