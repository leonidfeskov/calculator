/* eslint-disable no-console */

import { getNextMonth } from 'src/utils/date';

const startDate = new Date();

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
            date: getNextMonth(previousMonth.date),
            payment: this.payment,
        };

        const income = (previousMonth.sum * this.percentage) / 12;

        currentMonth.income = income;
        currentMonth.sum = previousMonth.sum + income + this.payment;

        this.depositeDate.push(currentMonth);
    }

    calculate() {
        this.depositeDate[0] = {
            date: startDate,
            sum: this.sum,
            income: 0,
            payment: 0,
        };

        while (this.period) {
            this.calculateSomePayment();
            this.period -= 1;
        }

        return this.depositeDate;
    }
}

export default function calculateDeposit(params) {
    const deposit = new Deposit(params);
    return deposit.calculate();
}
