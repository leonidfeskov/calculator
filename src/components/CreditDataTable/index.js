import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import MuiTable from '@material-ui/core/Table';
import MuiTableBody from '@material-ui/core/TableBody';
import MuiTableCell from '@material-ui/core/TableCell';
import MuiTableHead from '@material-ui/core/TableHead';
import MuiTableRow from '@material-ui/core/TableRow';

import 'src/components/CreditDataTable/CreditDataTable.css';
import Box from 'src/components/common/Box';
import BoxTitle from 'src/components/common/Box/Title';
import { priceFormat } from 'src/utils/common';
import { formatDate } from 'src/utils/date';

export default function CreditDataTable() {
    const { creditData } = useSelector((state) => state);

    return useMemo(
        () => (
            <Box>
                <BoxTitle>График платежей</BoxTitle>
                <MuiTable size="small" stickyHeader>
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
                        {creditData.table.map((row) => (
                            <MuiTableRow key={row.number}>
                                <MuiTableCell>{row.number}.</MuiTableCell>
                                <MuiTableCell>
                                    {formatDate(row.date)}
                                    &nbsp;
                                    {row.isPrepayment && '*'}
                                </MuiTableCell>
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
        ),
        [creditData]
    );
}
