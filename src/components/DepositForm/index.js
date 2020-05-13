import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import MuiButton from '@material-ui/core/Button';
import MuiGrid from '@material-ui/core/Grid';

import Box from 'src/components/common/Box';
import BoxTitle from 'src/components/common/Box/Title';
import Input from 'src/components/common/Input';
import { setPaymentSchedule } from 'src/reducers/paymentSchedule';
import calculateDeposit from 'src/calc/deposit';

export default function CreditForm() {
    const { depositParams } = useSelector((state) => state);
    const dispatch = useDispatch();

    const onSubmit = (values) => {
        const initialSum = parseFloat(values.creditSum);
        const percentage = parseFloat(values.creditPercent);
        const payment = parseFloat(values.paymentPerMonth);
        const period = parseFloat(values.creditPeriod);

        const depositData = calculateDeposit({
            initialSum,
            percentage,
            payment,
            period,
        });
        dispatch(setPaymentSchedule(depositData));
    };

    return (
        <Box>
            <BoxTitle>Параметры вклада</BoxTitle>
            <Form
                onSubmit={onSubmit}
                initialValues={depositParams}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit} noValidate autoComplete="off">
                        <MuiGrid container spacing={3}>
                            <MuiGrid item xs={12} md={3} lg={3}>
                                <Field name="initialSum">
                                    {({ input }) => <Input {...input} label="Первоначальный вклад" />}
                                </Field>
                            </MuiGrid>
                            <MuiGrid item xs={12} md={3} lg={3}>
                                <Field name="percentage">
                                    {({ input }) => <Input {...input} label="Процентная ставка" />}
                                </Field>
                            </MuiGrid>
                            <MuiGrid item xs={12} md={3} lg={3}>
                                <Field name="payment">
                                    {({ input }) => <Input {...input} label="Ежемесячное пополнение" />}
                                </Field>
                            </MuiGrid>
                            <MuiGrid item xs={12} md={3} lg={3}>
                                <Field name="period">
                                    {({ input }) => <Input {...input} label="Срок вклада, мес." />}
                                </Field>
                            </MuiGrid>
                        </MuiGrid>
                        <MuiGrid container justify="flex-end" spacing={3}>
                            <MuiGrid item xs={12} md={3} lg={3}>
                                <MuiButton variant="contained" color="primary" fullWidth type="submit">
                                    Рассчитать
                                </MuiButton>
                            </MuiGrid>
                        </MuiGrid>
                    </form>
                )}
            />
        </Box>
    );
}
