import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import MuiButton from '@material-ui/core/Button';
import MuiGrid from '@material-ui/core/Grid';

import Box from 'src/components/common/Box';
import BoxTitle from 'src/components/common/Box/Title';
import Input from 'src/components/common/Input';
import { setDepositData } from 'src/reducers/depositData';
import calculateDeposit from 'src/calc/deposit';

export default function CreditForm() {
    const { depositParams } = useSelector((state) => state);
    const dispatch = useDispatch();

    const onSubmit = (values) => {
        const initialSum = parseFloat(values.initialSum);
        const percentage = parseFloat(values.percentage);
        const payment = parseFloat(values.payment);
        const period = parseFloat(values.period);

        const depositData = calculateDeposit({
            initialSum,
            percentage,
            payment,
            period,
        });
        dispatch(setDepositData(depositData));
    };

    return (
        <>
            <BoxTitle>Параметры вклада</BoxTitle>
            <Box>
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
        </>
    );
}
