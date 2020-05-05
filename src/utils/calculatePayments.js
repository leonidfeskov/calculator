import { dateFormat, calcPercent } from './common';


const MAX_MONTHS_COUNT = 360;

export default function calculatePayments({ creditSum, creditPercent, paymentPerMonth }) {
    // заполняем начальные значения
    const data = [];
    const nowDate = new Date();

    const initialRow = {
        number: 1,
        date: dateFormat(nowDate),
        payment: creditSum > paymentPerMonth ? paymentPerMonth : creditSum,
        credit: creditSum,
        creditRepayment: 0,
    };

    initialRow.creditDebt = calcPercent(initialRow.credit, creditPercent, nowDate);
    initialRow.overpayment = initialRow.creditDebt;
    initialRow.creditRepayment = initialRow.payment - initialRow.creditDebt;

    data.push(initialRow);

    // заполняем остальные значения на основе начальных и данных от пользователя
    let rowIndex = 1;
    let prevRow = data[rowIndex - 1];
    while ((prevRow.credit + prevRow.creditDebt) > paymentPerMonth) {
        const nextMonthDate = new Date(nowDate.getFullYear(), nowDate.getMonth() + rowIndex, nowDate.getDate());

        const row = {
            number: rowIndex + 1,
            date: dateFormat(nextMonthDate),
            credit: prevRow.credit - prevRow.creditRepayment,
        };

        row.creditDebt = calcPercent(row.credit, creditPercent, nextMonthDate);
        row.overpayment = prevRow.overpayment + row.creditDebt;

        const creditWithPercents = row.credit + row.creditDebt;

        row.payment = creditWithPercents > paymentPerMonth ? paymentPerMonth : creditWithPercents;

        row.creditRepayment = row.payment - row.creditDebt;

        data.push(row);
        prevRow = data[rowIndex];
        rowIndex++;

        if (rowIndex > MAX_MONTHS_COUNT) {
            break;
        }
    }

    return {
        dataByMonths: data,
        summary: {
            overpayment: data[data.length - 1].overpayment,
            monthCount: data.length,
        }
    };
}
