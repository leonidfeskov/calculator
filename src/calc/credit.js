import { normalizeDate, getNextMonth, formatDate, formatDateISO } from 'src/utils/date';
import { roundValue } from 'src/utils/common';
import { calculatePercentage, calculateMoneyByPercentage } from 'src/calc/common';
import { CALCULATING_TYPE, PREPAYMENT_REPEAT } from 'src/reducers/creditParams';

export const MAX_MONTHS_COUNT = 360;
const startDate = normalizeDate(new Date());
const ERROR_SUM_INCREASED = 'Невозможно взять такой кредит, проценты больше минимального платежа.';
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
        this.prepayments = prepayments.sort((a, b) => (a.date > b.date ? 1 : -1));

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
        const prepaymentEveryMonth = this.prepayments.find((prepayment) => {
            return (
                prepayment.repeat === PREPAYMENT_REPEAT.MONTHLY.id &&
                prepayment.date < nextPaymentDate &&
                !(currentPaymentDate <= prepayment.date && prepayment.date < nextPaymentDate)
            );
        });

        // добавляем в список текущих досрочных платежей периодичные досрочные платежи
        if (prepaymentEveryMonth) {
            let nextRepeatedDate;
            const date = normalizeDate(new Date(prepaymentEveryMonth.date));
            const day = date.getDate();

            if (day >= this.currentPaymentDate.getDate()) {
                nextRepeatedDate = new Date(
                    this.currentPaymentDate.getFullYear(),
                    this.currentPaymentDate.getMonth(),
                    day + 1
                );
            } else {
                nextRepeatedDate = new Date(
                    this.nextPaymentDate.getFullYear(),
                    this.nextPaymentDate.getMonth(),
                    day + 1
                );
            }

            const prepayment = {
                date: formatDateISO(nextRepeatedDate),
                payment: prepaymentEveryMonth.payment,
            };
            currentPrepayments.push(prepayment);
        }

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

        const paymentByPercents = calculateMoneyByPercentage(
            previousPayment.creditLeft,
            this.percentage,
            previousPayment.date,
            currentPayment.date
        );

        // последний платежный месяц
        if (previousPayment.creditLeft <= payment) {
            currentPayment.payment = previousPayment.creditLeft + paymentByPercents;
        }

        const paymentByCredit = currentPayment.payment - paymentByPercents;

        currentPayment.paymentByPercents = paymentByPercents;
        currentPayment.paymentByCredit = paymentByCredit;
        currentPayment.overpayment = previousPayment.overpayment + paymentByPercents;
        currentPayment.creditLeft = previousPayment.creditLeft - paymentByCredit;

        addFormattedFields(currentPayment);
        this.creditData.push(currentPayment);
        this.creditLeft = currentPayment.creditLeft;
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
            if (this.creditLeft > this.creditSum) {
                this.error = ERROR_SUM_INCREASED;
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

export default function calculateCredit(params) {
    const credit = new Credit(params);
    return credit.calculate();
}
