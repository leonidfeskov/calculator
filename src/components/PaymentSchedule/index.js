import React from 'react';
import { useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import MuiTable from '@material-ui/core/Table';
import MuiTableBody from '@material-ui/core/TableBody';
import MuiTableCell from '@material-ui/core/TableCell';
import MuiTableHead from '@material-ui/core/TableHead';
import MuiTableRow from '@material-ui/core/TableRow';

import Box from 'src/components/common/Box';
import BoxTitle from 'src/components/common/Box/Title';
import { priceFormat } from 'src/utils/common';
import { formatDate } from 'src/utils/date';

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(even)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(MuiTableRow);

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(MuiTableCell);

export default function PaymentSchedule() {
    const { paymentSchedule } = useSelector((state) => state);

    return (
        <Box>
            <BoxTitle>График платежей</BoxTitle>
            <MuiTable size="small" stickyHeader>
                <MuiTableHead>
                    <MuiTableRow>
                        <StyledTableCell>№</StyledTableCell>
                        <StyledTableCell>Дата</StyledTableCell>
                        <StyledTableCell align="right">Платеж</StyledTableCell>
                        <StyledTableCell align="right">По процентам</StyledTableCell>
                        <StyledTableCell align="right">По кредиту</StyledTableCell>
                        <StyledTableCell align="right">Переплата</StyledTableCell>
                        <StyledTableCell align="right">Остаток долга</StyledTableCell>
                    </MuiTableRow>
                </MuiTableHead>
                <MuiTableBody>
                    {paymentSchedule.dataByMonths.map((row) => (
                        <StyledTableRow key={row.number}>
                            <MuiTableCell>{row.number}.</MuiTableCell>
                            <MuiTableCell>{formatDate(row.date)}</MuiTableCell>
                            <MuiTableCell align="right">{priceFormat(row.payment)}</MuiTableCell>
                            <MuiTableCell align="right">{priceFormat(row.paymentByPercents)}</MuiTableCell>
                            <MuiTableCell align="right">{priceFormat(row.paymentByCredit)}</MuiTableCell>
                            <MuiTableCell align="right">{priceFormat(row.overpayment)}</MuiTableCell>
                            <MuiTableCell align="right">{priceFormat(row.creditLeft)}</MuiTableCell>
                        </StyledTableRow>
                    ))}
                </MuiTableBody>
            </MuiTable>
        </Box>
    );
}
