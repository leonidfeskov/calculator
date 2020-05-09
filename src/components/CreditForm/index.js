import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button, Grid } from '@material-ui/core';

import Box from 'src/components/common/Box';
import BoxTitle from 'src/components/common/Box/Title';
import { setCreditParams } from 'src/reducers/creditParams';
import { setPaymentSchedule } from 'src/reducers/paymentSchedule';
import calculatePayments from 'src/utils/calculatePayments';

export default function CreditForm() {
    const { creditParams } = useSelector((state) => state);
    const dispatch = useDispatch();
    const formRef = useRef();

    const onButtonClick = () => {
        const elements = formRef.current.elements;
        const creditSum = parseFloat(elements.creditSum.value);
        const creditPercent = parseFloat(elements.creditPercent.value);
        const paymentPerMonth = parseFloat(elements.paymentPerMonth.value);
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
        <Box>
            <BoxTitle>Параметры кредита</BoxTitle>
            <form noValidate autoComplete="off" ref={formRef}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3} lg={3}>
                        <TextField
                            label="Сумма кредита"
                            name="creditSum"
                            defaultValue={creditParams.creditSum}
                            variant="outlined"
                            size="small"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <TextField
                            label="Процентная ставка"
                            name="creditPercent"
                            defaultValue={creditParams.creditPercent}
                            variant="outlined"
                            size="small"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <TextField
                            label="Ежемесячный платеж"
                            name="paymentPerMonth"
                            defaultValue={creditParams.paymentPerMonth}
                            variant="outlined"
                            size="small"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <Button variant="contained" color="primary" fullWidth onClick={onButtonClick}>
                            Рассчитать
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}
