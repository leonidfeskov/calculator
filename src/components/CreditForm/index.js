import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import MuiButton from '@material-ui/core/Button';
import MuiGrid from '@material-ui/core/Grid';

import Box from 'src/components/common/Box';
import BoxTitle from 'src/components/common/Box/Title';
import Input from 'src/components/common/Input';
import { setCreditParams } from 'src/reducers/creditParams';
import { setPaymentSchedule } from 'src/reducers/paymentSchedule';
import calculatePayments from 'src/utils/calculatePayments';

export default function CreditForm() {
    const { creditParams } = useSelector((state) => state);
    const dispatch = useDispatch();

    const onSubmit = (values) => {
        const creditSum = parseFloat(values.creditSum);
        const creditPercent = parseFloat(values.creditPercent);
        const paymentPerMonth = parseFloat(values.paymentPerMonth);
        dispatch(
            setCreditParams({
                creditSum,
                creditPercent,
                paymentPerMonth,
            })
        );
        const paymentSchedule = calculatePayments({ creditSum, creditPercent, paymentPerMonth });
        dispatch(setPaymentSchedule(paymentSchedule));
    };

    return (
        <>
            <BoxTitle>Параметры кредита</BoxTitle>
            <Box>
                <Form
                    onSubmit={onSubmit}
                    initialValues={creditParams}
                    render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} noValidate autoComplete="off">
                            <MuiGrid container spacing={3}>
                                <MuiGrid item xs={12} md={3} lg={3}>
                                    <Field name="creditSum">
                                        {({ input }) => <Input {...input} label="Сумма кредита" />}
                                    </Field>
                                </MuiGrid>
                                <MuiGrid item xs={12} md={3} lg={3}>
                                    <Field name="creditPercent">
                                        {({ input }) => <Input {...input} label="Процентная ставка" />}
                                    </Field>
                                </MuiGrid>
                                <MuiGrid item xs={12} md={3} lg={3}>
                                    <Field name="paymentPerMonth">
                                        {({ input }) => <Input {...input} label="Ежемесячный платеж" />}
                                    </Field>
                                </MuiGrid>
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
        </>
    );
}
