import { normalizeDate, getNextMonth, formatDate, formatDateISO, getDateAfterXMonth } from 'src/utils/date';
import { roundValue } from 'src/utils/common';
import { calculatePercentage, calculateMoneyByPercentage, getBaseLog } from 'src/calc/common';
import { CALCULATING_TYPE, PREPAYMENT_REPEAT } from 'src/reducers/creditParams';

export const MAX_MONTHS_COUNT = 360;
const startDate = normalizeDate(new Date());
// const ERROR_SUM_INCREASED = 'Невозможно взять такой кредит, проценты больше минимального платежа.';
const ERROR_TOO_LONG = 'Невозможно взять кредит более чем на 30 лет';

function addFormattedFields(row) {
    row.dateFormatted = formatDate(row.date);
    row.paymentRounded = roundValue(row.payment);
    row.paymentByPercentsRounded = roundValue(row.paymentByPercents);
    row.paymentByCreditRounded = roundValue(row.paymentByCredit);
    row.overpaymentRounded = roundValue(row.overpayment);
    row.creditLeftRounded = roundValue(row.creditLeft);
}

function calculateAnnuityPayment(sum, percentage, period) {
    const percentageInMonth = percentage / 12;
    const pow = Math.pow(1 + percentageInMonth, period);
    const annuityFactor = (percentageInMonth * pow) / (pow - 1);
    const annuityPayment = sum * annuityFactor;
    return Math.ceil(annuityPayment);
}

class Credit {
    constructor({
        calculatingType = CALCULATING_TYPE.BY_PAYMENT,
        creditSum,
        creditPercent,
        creditPeriod = 1,
        paymentPerMonth,
        prepayments = [],
    }) {
        this.calculatingType = calculatingType;
        this.creditSum = creditSum;
        this.percentage = creditPercent / 100;
        this.period = creditPeriod;
        this.payment = paymentPerMonth;
        this.prepayments = [];
        prepayments.forEach((prepayment) => {
            for (let i = 0; i < MAX_MONTHS_COUNT; i++) {
                if (prepayment.repeat === PREPAYMENT_REPEAT.NONE.id) {
                    this.prepayments.push(prepayment);
                    break;
                }

                if (
                    prepayment.repeat === PREPAYMENT_REPEAT.EVERY_MONTH.id ||
                    (prepayment.repeat === PREPAYMENT_REPEAT.EVERY_THREE_MONTHS.id && i % 3 === 0) ||
                    (prepayment.repeat === PREPAYMENT_REPEAT.EVERY_HALF_YEAR.id && i % 6 === 0) ||
                    (prepayment.repeat === PREPAYMENT_REPEAT.EVERY_YEAR.id && i % 12 === 0)
                ) {
                    this.prepayments.push({
                        date: getDateAfterXMonth(prepayment.date, i),
                        payment: prepayment.payment,
                    });
                }
            }
        });

        this.creditData = [];
        this.creditLeft = creditSum;

        this.monthCount = 0;
        this.currentPaymentDate = new Date(startDate);
        this.nextPaymentDate = getNextMonth(this.currentPaymentDate);
        this.error = false;
    }

    checkCreditEnd() {
        return this.creditLeft <= 0;
    }

    makePrepayments() {
        const currentPaymentDate = formatDateISO(this.currentPaymentDate);
        const nextPaymentDate = formatDateISO(this.nextPaymentDate);

        // досрочные платежи, которые нужно учесть между платежными датами по графику платежей
        const currentPrepayments = this.prepayments.filter((prepayment) => {
            return currentPaymentDate <= prepayment.date && prepayment.date < nextPaymentDate;
        });

        // периодичные досрочные платежи, которые нужно учесть между платежными датами по графику платежей
        // const prepaymentEveryMonth = this.prepayments.find((prepayment) => {
        //     return (
        //         prepayment.repeat === PREPAYMENT_REPEAT.EVERY_MONTH.id &&
        //         prepayment.date < nextPaymentDate &&
        //         !(currentPaymentDate <= prepayment.date && prepayment.date < nextPaymentDate)
        //     );
        // });
        //
        // // добавляем в список текущих досрочных платежей периодичные досрочные платежи
        // if (prepaymentEveryMonth) {
        //     let nextRepeatedDate;
        //     const date = normalizeDate(new Date(prepaymentEveryMonth.date));
        //     const day = date.getDate();
        //
        //     if (day >= this.currentPaymentDate.getDate()) {
        //         nextRepeatedDate = new Date(
        //             this.currentPaymentDate.getFullYear(),
        //             this.currentPaymentDate.getMonth(),
        //             day + 1
        //         );
        //     } else {
        //         nextRepeatedDate = new Date(
        //             this.nextPaymentDate.getFullYear(),
        //             this.nextPaymentDate.getMonth(),
        //             day + 1
        //         );
        //     }
        //
        //     const prepayment = {
        //         date: formatDateISO(nextRepeatedDate),
        //         payment: prepaymentEveryMonth.payment,
        //     };
        //     currentPrepayments.push(prepayment);
        // }

        for (let i = 0; i < currentPrepayments.length; i++) {
            const { date, payment } = currentPrepayments[i];
            this.calculateSomePayment(normalizeDate(date), payment, true);
            if (this.checkCreditEnd()) {
                break;
            }
        }
    }

    calculateSomePayment(date, payment, isPrepayment) {
        const previousPayment = this.creditData[this.creditData.length - 1];
        const currentPayment = {
            number: previousPayment.number + 1,
            date,
            payment,
            isPrepayment,
        };

        let debtByPercents = calculateMoneyByPercentage(
            previousPayment.creditLeft,
            this.percentage,
            previousPayment.date,
            currentPayment.date
        );
        debtByPercents += previousPayment.debtByPercents;

        // последний платежный месяц
        if (previousPayment.creditLeft <= payment) {
            currentPayment.payment = previousPayment.creditLeft + debtByPercents;
        }

        // Если совершаем досрочный платеж на сумму меньше, чем накало процентов, то погашаем часть процентов,
        // а остальной долг по процентам запоминаем в debtByPercents, чтобы учесть при следующем платеже
        const paymentByPercents = Math.min(currentPayment.payment, debtByPercents);
        const paymentByCredit = Math.max(0, currentPayment.payment - paymentByPercents);

        currentPayment.paymentByPercents = paymentByPercents;
        currentPayment.debtByPercents = debtByPercents - paymentByPercents;
        currentPayment.paymentByCredit = paymentByCredit;
        currentPayment.overpayment = previousPayment.overpayment + currentPayment.paymentByPercents;
        currentPayment.creditLeft = previousPayment.creditLeft - currentPayment.paymentByCredit;

        addFormattedFields(currentPayment);
        this.creditLeft = currentPayment.creditLeft;
        this.creditData.push(currentPayment);
    }

    calculate() {
        if (this.calculatingType === CALCULATING_TYPE.BY_PERIOD) {
            this.payment = calculateAnnuityPayment(this.creditSum, this.percentage, this.period);
        }

        this.creditData[0] = {
            number: 0,
            date: startDate,
            payment: 0,
            paymentByPercents: 0,
            debtByPercents: 0,
            paymentByCredit: 0,
            overpayment: 0,
            creditLeft: this.creditSum,
        };

        addFormattedFields(this.creditData[0]);

        while (!this.checkCreditEnd()) {
            this.makePrepayments();
            if (this.checkCreditEnd()) {
                break;
            }

            this.calculateSomePayment(this.nextPaymentDate, this.payment);

            this.monthCount += 1;
            this.currentPaymentDate = new Date(this.nextPaymentDate);
            this.nextPaymentDate = getNextMonth(this.nextPaymentDate);
            if (this.monthCount >= MAX_MONTHS_COUNT) {
                this.error = ERROR_TOO_LONG;
                break;
            }
        }

        const firstPayment = this.creditData[1];
        const lastPayment = this.creditData[this.creditData.length - 1];

        return {
            table: this.creditData,
            summary: {
                overpayment: lastPayment.overpayment,
                overpaymentPercent: calculatePercentage(lastPayment.overpayment, this.creditSum),
                monthCount: this.monthCount,
                lastPaymentDate: lastPayment.date,
                payment: this.payment,
                onPercentage: calculatePercentage(firstPayment.paymentByPercents, this.payment),
            },
            error: this.error,
        };
    }
}

export function calcApproximateCreditSummary(sum, percentage, payment) {
    const i = percentage / 12 / 100;
    const monthCount = getBaseLog(i + 1, payment / (payment - i * sum));
    const overpayment = payment * monthCount - sum;
    return {
        monthCount: Math.ceil(monthCount),
        overpayment: Math.round(overpayment),
    };
}

export default function calculateCredit(params) {
    const credit = new Credit(params);
    return credit.calculate();
}
