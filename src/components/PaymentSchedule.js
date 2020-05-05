import React from 'react';
import { useSelector } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Title from './Title';
import { priceFormat } from '../utils/common';


export default function PaymentSchedule() {
    const { paymentSchedule } = useSelector((state) => state);

    return (
        <React.Fragment>
            <Title>График платежей</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>№</TableCell>
                        <TableCell>Дата</TableCell>
                        <TableCell align="right">Платеж</TableCell>
                        <TableCell align="right">По процентам</TableCell>
                        <TableCell align="right">По кредиту</TableCell>
                        <TableCell align="right">Переплата</TableCell>
                        <TableCell align="right">Остаток долга</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paymentSchedule.dataByMonths.map((row) => (
                        <TableRow key={row.number}>
                            <TableCell>{row.number}.</TableCell>
                            <TableCell>{row.date}</TableCell>
                            <TableCell align="right">{priceFormat(row.payment)}</TableCell>
                            <TableCell align="right">{priceFormat(row.creditDebt)}</TableCell>
                            <TableCell align="right">{priceFormat(row.creditRepayment)}</TableCell>
                            <TableCell align="right">{priceFormat(row.overpayment)}</TableCell>
                            <TableCell align="right">{priceFormat(row.credit)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}
