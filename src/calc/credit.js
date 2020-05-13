import { getNextMonth, getDaysCountInYear, getDaysCountBetweenDates, formatDate, formatDateISO } from 'src/utils/date';
import { roundValue } from 'src/utils/common';
import { calculatePercentage } from 'src/calc/common';
import { CALCULATING_TYPE } from 'src/reducers/creditParams';

const MAX_MONTHS_COUNT = 360;
const startDate = new Date();

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
    return roundValue(annuityPayment);
}

class PaymentSchedule {
    constructor({
        calculatingType = CALCULATING_TYPE.BY_PAYMENT,
        creditSum,
        creditPercent,
        creditPeriod = 1,
        paymentPerMonth,
        prepayments = [
            // {
            //     date: '2020-09-11',
            //     payment: 5000,
            //     repeat: 'everyMonth',
            // },
        ],
    }) {
        this.calculatingType = calculatingType;
        this.creditSum = creditSum;
        this.percentage = creditPercent / 100;
        this.period = creditPeriod;
        this.payment = paymentPerMonth;
        this.prepayments = prepayments.sort((a, b) => (a.date > b.date ? 1 : -1));

        this.paymentSchedule = [];
        this.creditLeft = creditSum;

        this.monthCount = 0;
        this.currentPaymentDate = new Date(startDate);
        this.nextPaymentDate = getNextMonth(this.currentPaymentDate);
    }

    checkCreditEnd() {
        return this.creditLeft <= 0 || this.monthCount > MAX_MONTHS_COUNT;
    }

    makePrepayments() {
        const currentPaymentDate = formatDateISO(this.currentPaymentDate);
        const nextPaymentDate = formatDateISO(this.nextPaymentDate);
        // находим досрочные платежи, которые нужно учесть между платежными датами по графику платежей
        const currentPrepayments = this.prepayments.filter((prepayment) => {
            return currentPaymentDate <= prepayment.date && prepayment.date < nextPaymentDate && !prepayment.repeat;
        });

        const prepaymentEveryMonth = this.prepayments.find((prepayment) => {
            return prepayment.repeat === 'everyMonth' && prepayment.date < nextPaymentDate;
        });

        // добавляем в список текущих досрочных платежей периодичные досрочные платежи
        if (prepaymentEveryMonth) {
            let nextRepeatedDate;
            const date = new Date(prepaymentEveryMonth.date);
            const day = date.getDate();

            if (day > this.currentPaymentDate.getDate()) {
                nextRepeatedDate = new Date(
                    this.currentPaymentDate.getFullYear(),
                    this.currentPaymentDate.getMonth(),
                    day
                );
            } else {
                nextRepeatedDate = new Date(this.nextPaymentDate.getFullYear(), this.nextPaymentDate.getMonth(), day);
            }

            const prepayment = {
                date: formatDateISO(nextRepeatedDate),
                payment: prepaymentEveryMonth.payment,
            };
            currentPrepayments.push(prepayment);
        }

        for (let i = 0; i < currentPrepayments.length; i++) {
            const { date, payment } = currentPrepayments[i];
            this.calculateSomePayment(new Date(date), payment, true);
            if (this.checkCreditEnd()) {
                break;
            }
        }
    }

    calculateSomePayment(date, payment, isPrepayment) {
        const previousPayment = this.paymentSchedule[this.paymentSchedule.length - 1];
        const currentPayment = {
            number: previousPayment.number + 1,
            date,
            payment,
            isPrepayment,
        };

        const daysCountInPreviousYear = getDaysCountInYear(previousPayment.date.getFullYear());
        const daysCountInCurrentYear = getDaysCountInYear(currentPayment.date.getFullYear());
        let paymentByPercents = 0;
        // Случай, когда одна часть платежного периода находится в невисокосном году, а вторая в високосном или наоборот
        // В таком случае стоимость одного дня кредита будет разной для каждой части
        if (
            previousPayment.date.getMonth() === 11 &&
            currentPayment.date.getMonth() === 0 &&
            daysCountInPreviousYear !== daysCountInCurrentYear
        ) {
            const daysCountInPreviousMonth = getDaysCountBetweenDates(
                previousPayment.date,
                new Date(`${previousPayment.date.getFullYear()}-12-31`)
            );
            const daysCountInCurrentMonth = getDaysCountBetweenDates(
                new Date(`${previousPayment.date.getFullYear()}-12-31`),
                currentPayment.date
            );

            const oneDayCreditCostForPreviousMonth =
                (previousPayment.creditLeft * this.percentage) / daysCountInPreviousYear;
            const oneDayCreditCostForCurrentMonth =
                (previousPayment.creditLeft * this.percentage) / daysCountInCurrentYear;

            paymentByPercents =
                oneDayCreditCostForPreviousMonth * daysCountInPreviousMonth +
                oneDayCreditCostForCurrentMonth * daysCountInCurrentMonth;
        } else {
            // обычный случай
            const oneDayCreditCost = (previousPayment.creditLeft * this.percentage) / daysCountInPreviousYear;
            paymentByPercents = oneDayCreditCost * getDaysCountBetweenDates(previousPayment.date, currentPayment.date);
        }

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
        this.paymentSchedule.push(currentPayment);
        this.creditLeft = currentPayment.creditLeft;
    }

    calculate() {
        if (this.calculatingType === CALCULATING_TYPE.BY_PERIOD) {
            this.payment = calculateAnnuityPayment(this.creditSum, this.percentage, this.period);
        }

        this.paymentSchedule[0] = {
            number: 0,
            date: startDate,
            payment: 0,
            paymentByPercents: 0,
            paymentByCredit: 0,
            overpayment: 0,
            creditLeft: this.creditSum,
        };

        addFormattedFields(this.paymentSchedule[0]);

        while (!this.checkCreditEnd()) {
            this.makePrepayments();
            if (this.checkCreditEnd()) {
                break;
            }
            this.calculateSomePayment(this.nextPaymentDate, this.payment);
            this.monthCount += 1;
            this.currentPaymentDate = new Date(this.nextPaymentDate);
            this.nextPaymentDate = getNextMonth(this.nextPaymentDate);
        }

        const firstPayment = this.paymentSchedule[1];
        const lastPayment = this.paymentSchedule[this.paymentSchedule.length - 1];

        return {
            dataByMonths: this.paymentSchedule,
            summary: {
                overpayment: lastPayment.overpayment,
                overpaymentPercent: calculatePercentage(lastPayment.overpayment, this.creditSum),
                monthCount: this.monthCount,
                lastPaymentDate: lastPayment.date,
                payment: this.payment,
                onPercentage: calculatePercentage(firstPayment.paymentByPercents, this.payment),
            },
        };
    }
}

export default function calculatePayments(params) {
    const schedule = new PaymentSchedule(params);
    return schedule.calculate();
}
