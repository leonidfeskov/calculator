import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import MuiButton from '@material-ui/core/Button';
import MuiGrid from '@material-ui/core/Grid';
import MuiMenuItem from '@material-ui/core/MenuItem';

import Box from 'src/components/common/Box';
import BoxTitle from 'src/components/common/Box/Title';
import Input from 'src/components/common/Input';
import Select from 'src/components/common/Select';
import { CALCULATING_TYPE } from 'src/reducers/creditParams';
import { setPaymentSchedule } from 'src/reducers/paymentSchedule';
import calculatePayments from 'src/utils/calculatePayments';

export default function CreditForm() {
    const { creditParams } = useSelector((state) => state);
    const dispatch = useDispatch();

    const onSubmit = (values) => {
        const creditSum = parseFloat(values.creditSum);
        const creditPercent = parseFloat(values.creditPercent);
        const paymentPerMonth = parseFloat(values.paymentPerMonth);
        const creditPeriod = parseFloat(values.creditPeriod);

        const paymentSchedule = calculatePayments({
            calculatingType: values.calculatingType,
            creditSum,
            creditPercent,
            paymentPerMonth,
            creditPeriod,
        });
        dispatch(setPaymentSchedule(paymentSchedule));
    };

    return (
        <>
            <BoxTitle>Параметры кредита</BoxTitle>
            <Box>
                <Form
                    onSubmit={onSubmit}
                    initialValues={creditParams}
                    render={({ handleSubmit, values }) => (
                        <form onSubmit={handleSubmit} noValidate autoComplete="off">
                            <MuiGrid container spacing={3}>
                                <MuiGrid item xs={12} md={3} lg={3}>
                                    <Field name="calculatingType">
                                        {({ input }) => (
                                            <Select {...input} label="Способ расчета">
                                                <MuiMenuItem value={CALCULATING_TYPE.BY_PAYMENT}>
                                                    По сумме платежа
                                                </MuiMenuItem>
                                                <MuiMenuItem value={CALCULATING_TYPE.BY_PERIOD}>
                                                    По сроку кредита
                                                </MuiMenuItem>
                                            </Select>
                                        )}
                                    </Field>
                                </MuiGrid>
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
                                    {values.calculatingType === CALCULATING_TYPE.BY_PAYMENT && (
                                        <Field name="paymentPerMonth">
                                            {({ input }) => <Input {...input} label="Ежемесячный платеж" />}
                                        </Field>
                                    )}
                                    {values.calculatingType === CALCULATING_TYPE.BY_PERIOD && (
                                        <Field name="creditPeriod">
                                            {({ input }) => <Input {...input} label="Срок кредита, мес." />}
                                        </Field>
                                    )}
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
