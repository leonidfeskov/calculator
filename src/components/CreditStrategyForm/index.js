import React, { useState } from 'react';
import MuiButton from '@material-ui/core/Button';
import MuiGrid from '@material-ui/core/Grid';

import Box from 'src/components/common/Box';
import BoxTitle from 'src/components/common/Box/Title';
import Input from 'src/components/common/Input';
import calculateCredit, { calcApproximateCreditSummary } from 'src/calc/credit';
import calculateDeposit, { calcApproximateDepositSummary } from 'src/calc/deposit';
import { priceFormat } from 'src/utils/common';

export default function CreditStrategyForm() {
    const [creditSum, setCreditSum] = useState(4000000);
    const [creditPercentage, setCreditPercentage] = useState(10);
    const [creditPayment, setCreditPayment] = useState(50000);

    const [depositPercentage, setDepositPercentage] = useState(5);
    const [depositPayment, setDepositPayment] = useState(50000);

    const [strategyOnlyCredit, setStrategyOnlyCredit] = useState({});
    const [strategyCreditAndDeposit, setStrategyCreditAndDeposit] = useState({});
    const [strategyRepayCreditWithDeposit, setStrategyRepayCreditWithDeposit] = useState({});

    const onSubmit = (event) => {
        event.preventDefault();

        const totalPayment = creditPayment + depositPayment;

        // Старатегия 2. Платим кредит и параллельно пополняем вклад
        const strategy2 = calcApproximateCreditSummary(creditSum, creditPercentage, creditPayment);
        const strategy2Deposit = calcApproximateDepositSummary(depositPercentage, depositPayment, strategy2.monthCount);
        setStrategyCreditAndDeposit({
            monthCount: strategy2.monthCount,
            overpayment: strategy2.overpayment,
            depositSum: strategy2Deposit,
        });

        // Стратегия 1. Все платим за кредит
        const strategy1 = calcApproximateCreditSummary(creditSum, creditPercentage, totalPayment);
        // const strategy1Deposit = calcApproximateDepositSummary(
        //     depositPercentage,
        //     totalPayment,
        //     strategy2.monthCount - strategy1.monthCount
        // );
        setStrategyOnlyCredit({
            monthCount: strategy1.monthCount,
            overpayment: strategy1.overpayment,
            depositSum: 0,
        });

        // Стратегия 3. Платим кредит и параллельно пополняем вклад пока его не хватит на погашение остатка по кредиту
        const strategy3 = {
            creditData: calculateCredit({
                creditSum,
                creditPercent: creditPercentage,
                paymentPerMonth: creditPayment,
            }),
        };
        strategy3.depositData = calculateDeposit({
            initialSum: 0,
            percentage: depositPercentage,
            payment: depositPayment,
            period: strategy3.creditData.summary.monthCount,
        });

        // находим месяц, в котором сумма вклада будет больше остатка по кредиту
        let monthCount = strategy3.creditData.table.length;
        for (let i = 0; i < strategy3.creditData.table.length; i++) {
            if (strategy3.depositData.table[i].sum >= strategy3.creditData.table[i].creditLeft) {
                monthCount = i;
                break;
            }
        }

        console.log(monthCount);
        console.log(strategy3.creditData.table);

        setStrategyRepayCreditWithDeposit({
            monthCount,
            overpayment: strategy3.creditData.table[monthCount].overpayment,
            depositSum: 0,
        });
    };

    return (
        <>
            <BoxTitle>Стратегии погашения кредита</BoxTitle>
            <Box>
                <form onSubmit={onSubmit} noValidate autoComplete="off">
                    <MuiGrid container spacing={3}>
                        <MuiGrid item xs={12} md={3} lg={3}>
                            <Input
                                value={creditSum}
                                onChange={({ target }) => setCreditSum(parseFloat(target.value))}
                                label="Сумма кредита"
                            />
                        </MuiGrid>
                        <MuiGrid item xs={12} md={3} lg={3}>
                            <Input
                                value={creditPercentage}
                                onChange={({ target }) => setCreditPercentage(parseFloat(target.value))}
                                label="Процентная ставка"
                            />
                        </MuiGrid>
                        <MuiGrid item xs={12} md={3} lg={3}>
                            <Input
                                value={creditPayment}
                                onChange={({ target }) => setCreditPayment(parseFloat(target.value))}
                                label="Платеж по кредиту"
                            />
                        </MuiGrid>
                    </MuiGrid>
                    <MuiGrid container spacing={3}>
                        <MuiGrid item xs={12} md={3} lg={3} />
                        <MuiGrid item xs={12} md={3} lg={3}>
                            <Input
                                value={depositPercentage}
                                onChange={({ target }) => setDepositPercentage(parseFloat(target.value))}
                                label="Процентная ставка"
                            />
                        </MuiGrid>
                        <MuiGrid item xs={12} md={3} lg={3}>
                            <Input
                                value={depositPayment}
                                onChange={({ target }) => setDepositPayment(parseFloat(target.value))}
                                label="Поплнение вклада"
                            />
                        </MuiGrid>
                    </MuiGrid>
                    <MuiGrid container justify="flex-end" spacing={3}>
                        <MuiGrid item xs={12} md={3} lg={3}>
                            <MuiButton variant="contained" color="primary" fullWidth type="submit" onClick={onSubmit}>
                                Рассчитать
                            </MuiButton>
                        </MuiGrid>
                    </MuiGrid>
                </form>
            </Box>

            <MuiGrid container spacing={3}>
                <MuiGrid item xs={12} md={3} lg={3}>
                    <BoxTitle>Только кредит</BoxTitle>
                    <Box>
                        Скрок кредита <b>{strategyOnlyCredit.monthCount} мес</b>.
                        <br />
                        Переплата <b>{priceFormat(strategyOnlyCredit.overpayment)} руб.</b>
                        <br />
                        Сумма на вкладе в конце срока <b>{priceFormat(strategyOnlyCredit.depositSum)} руб.</b>
                    </Box>
                </MuiGrid>

                <MuiGrid item xs={12} md={3} lg={3}>
                    <BoxTitle>Кредит + Вклад</BoxTitle>
                    <Box>
                        Скрок кредита <b>{strategyCreditAndDeposit.monthCount} мес</b>.
                        <br />
                        Переплата <b>{priceFormat(strategyCreditAndDeposit.overpayment)} руб.</b>
                        <br />
                        Сумма на вкладе в конце срока <b>{priceFormat(strategyCreditAndDeposit.depositSum)} руб.</b>
                    </Box>
                </MuiGrid>

                <MuiGrid item xs={12} md={3} lg={3}>
                    <BoxTitle>Кредит + погашение вкладом</BoxTitle>
                    <Box>
                        Скрок кредита <b>{strategyRepayCreditWithDeposit.monthCount} мес</b>.
                        <br />
                        Переплата <b>{priceFormat(strategyRepayCreditWithDeposit.overpayment)} руб.</b>
                        <br />
                        Сумма на вкладе в конце срока{' '}
                        <b>{priceFormat(strategyRepayCreditWithDeposit.depositSum)} руб.</b>
                    </Box>
                </MuiGrid>
            </MuiGrid>
        </>
    );
}
