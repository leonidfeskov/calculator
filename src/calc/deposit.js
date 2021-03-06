import { calculateMoneyByPercentage } from 'src/calc/common';

import { normalizeDate, getNextMonth } from 'src/utils/date';

const startDate = normalizeDate(new Date());

class Deposit {
    constructor({ initialSum, percentage, payment, period }) {
        this.sum = initialSum;
        this.percentage = percentage / 100;
        this.payment = payment;
        this.period = period;

        this.depositeDate = [];
    }

    calculateSomePayment() {
        const previousMonth = this.depositeDate[this.depositeDate.length - 1];
        const currentMonth = {
            number: previousMonth.number + 1,
            date: getNextMonth(previousMonth.date),
            payment: this.payment,
        };

        const income = calculateMoneyByPercentage(
            previousMonth.sum,
            this.percentage,
            previousMonth.date,
            currentMonth.date
        );

        currentMonth.income = income;
        currentMonth.totalIncome = previousMonth.totalIncome + income;
        currentMonth.sum = previousMonth.sum + income + this.payment;

        this.depositeDate.push(currentMonth);
    }

    calculate() {
        this.depositeDate[0] = {
            number: 0,
            date: startDate,
            sum: this.sum,
            income: 0,
            totalIncome: 0,
            payment: 0,
        };

        while (this.period) {
            this.calculateSomePayment();
            this.period -= 1;
        }

        const lastPayment = this.depositeDate[this.depositeDate.length - 1];

        return {
            table: this.depositeDate,
            summary: {
                period: this.depositeDate.length - 1,
                endDate: lastPayment.date,
                totalIncome: lastPayment.totalIncome,
                totalSum: lastPayment.sum,
            },
        };
    }
}

export function calcApproximateDepositSummary(percentage, payment, monthCount) {
    const i = percentage / 12 / 100;
    const sum = (payment * (Math.pow(1 + i, monthCount) - 1)) / i;
    return Math.round(sum);
}

export default function calculateDeposit(params) {
    const deposit = new Deposit(params);
    return deposit.calculate();
}
