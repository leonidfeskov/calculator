import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Title from './Title';
import { setCreditParams } from '../reducers/creditParams';
import { setPaymentSchedule } from '../reducers/paymentSchedule';
import calculatePayments from '../utils/calculatePayments';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            marginBottom: theme.spacing(3),
        },
    },
}));

export default function CreditForm() {
    const classes = useStyles();
    const { creditParams } = useSelector((state) => state);
    const dispatch = useDispatch();
    const formRef = useRef();

    const onButtonClick = () => {
        const elements = formRef.current.elements;
        const creditSum = parseFloat(elements.creditSum.value);
        const creditPercent = parseFloat(elements.creditPercent.value);
        const paymentPerMonth = parseFloat(elements.paymentPerMonth.value);
        dispatch(setCreditParams({
            creditSum,
            creditPercent,
            paymentPerMonth,
        }));

        const paymentSchedule = calculatePayments({ creditSum, creditPercent, paymentPerMonth });
        dispatch(setPaymentSchedule(paymentSchedule))
    };

    return (
        <form className={classes.root} noValidate autoComplete="off" ref={formRef}>
            <Title>Параметры кредита</Title>
            <TextField
                label="Сумма кредита"
                name="creditSum"
                defaultValue={creditParams.creditSum}
                variant="outlined"
                size="small"
                fullWidth
            />
            <TextField
                label="Процентная ставка"
                name="creditPercent"
                defaultValue={creditParams.creditPercent}
                variant="outlined"
                size="small"
                fullWidth
            />
            <TextField
                label="Ежемесячный платеж"
                name="paymentPerMonth"
                defaultValue={creditParams.paymentPerMonth}
                variant="outlined"
                size="small"
                fullWidth
            />
            <Button variant="contained" color="primary" fullWidth onClick={onButtonClick}>
                Рассчитать
            </Button>
        </form>
    )
}
