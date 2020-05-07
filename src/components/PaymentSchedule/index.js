import React from 'react';
import { useSelector } from 'react-redux';
import MuiTable from '@material-ui/core/Table';
import MuiTableBody from '@material-ui/core/TableBody';
import MuiTableCell from '@material-ui/core/TableCell';
import MuiTableHead from '@material-ui/core/TableHead';
import MuiTableRow from '@material-ui/core/TableRow';

import Box from '../common/Box';
import BoxTitle from '../common/Box/Title';
import { priceFormat } from '../../utils/common';
import { formatDate } from '../../utils/date';

export default function PaymentSchedule() {
    const { paymentSchedule } = useSelector((state) => state);

    return (
        <Box>
            <BoxTitle>График платежей</BoxTitle>
            <MuiTable size="small">
                <MuiTableHead>
                    <MuiTableRow>
                        <MuiTableCell>№</MuiTableCell>
                        <MuiTableCell>Дата</MuiTableCell>
                        <MuiTableCell align="right">Платеж</MuiTableCell>
                        <MuiTableCell align="right">По процентам</MuiTableCell>
                        <MuiTableCell align="right">По кредиту</MuiTableCell>
                        <MuiTableCell align="right">Переплата</MuiTableCell>
                        <MuiTableCell align="right">Остаток долга</MuiTableCell>
                    </MuiTableRow>
                </MuiTableHead>
                <MuiTableBody>
                    {paymentSchedule.dataByMonths.map((row) => (
                        <MuiTableRow key={row.number}>
                            <MuiTableCell>{row.number}.</MuiTableCell>
                            <MuiTableCell>{formatDate(row.date)}</MuiTableCell>
                            <MuiTableCell align="right">{priceFormat(row.payment)}</MuiTableCell>
                            <MuiTableCell align="right">{priceFormat(row.paymentByPercents)}</MuiTableCell>
                            <MuiTableCell align="right">{priceFormat(row.paymentByCredit)}</MuiTableCell>
                            <MuiTableCell align="right">{priceFormat(row.overpayment)}</MuiTableCell>
                            <MuiTableCell align="right">{priceFormat(row.creditLeft)}</MuiTableCell>
                        </MuiTableRow>
                    ))}
                </MuiTableBody>
            </MuiTable>
        </Box>
    );
}
