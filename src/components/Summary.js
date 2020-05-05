import React from 'react';
import { useSelector } from 'react-redux';
import Title from './Title';
import Typography from "@material-ui/core/Typography";
import {priceFormat, numConversion} from '../utils/common';

export default function Summary() {
    const { paymentSchedule } = useSelector((state) => state);
    return (
        <React.Fragment>
            <Title>Результат</Title>
            <Typography color="textSecondary">
                Срок кредита:
            </Typography>
            <Typography component="p" variant="h4">
                {paymentSchedule.summary.monthCount}
                {' '}
                {numConversion(paymentSchedule.summary.monthCount, ['месяц', 'месяца', 'месяцев'])}
            </Typography>
            <Typography color="textSecondary">
                Переплата:
            </Typography>
            <Typography component="p" variant="h4">
                {priceFormat(paymentSchedule.summary.overpayment)}
            </Typography>
        </React.Fragment>
    );
}
