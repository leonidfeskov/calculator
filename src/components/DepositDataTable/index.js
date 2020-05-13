import React from 'react';
import { useSelector } from 'react-redux';
import MuiTable from '@material-ui/core/Table';
import MuiTableBody from '@material-ui/core/TableBody';
import MuiTableCell from '@material-ui/core/TableCell';
import MuiTableHead from '@material-ui/core/TableHead';
import MuiTableRow from '@material-ui/core/TableRow';

import Box from 'src/components/common/Box';
import BoxTitle from 'src/components/common/Box/Title';
import { priceFormat } from 'src/utils/common';
import { formatDate } from 'src/utils/date';

export default function DepositDataTable() {
    const { depositData } = useSelector((state) => state);

    return (
        <Box>
            <BoxTitle>Депозит</BoxTitle>
            <MuiTable size="small" stickyHeader>
                <MuiTableHead>
                    <MuiTableRow>
                        <MuiTableCell>№</MuiTableCell>
                        <MuiTableCell>Дата</MuiTableCell>
                        <MuiTableCell align="right">Пополнение</MuiTableCell>
                        <MuiTableCell align="right">Доход по процентам</MuiTableCell>
                        <MuiTableCell align="right">Сумма вклада</MuiTableCell>
                    </MuiTableRow>
                </MuiTableHead>
                <MuiTableBody>
                    {depositData.map((row, index) => (
                        <MuiTableRow key={index}>
                            <MuiTableCell />
                            <MuiTableCell>{formatDate(row.date)}</MuiTableCell>
                            <MuiTableCell align="right">{priceFormat(row.payment)}</MuiTableCell>
                            <MuiTableCell align="right">{priceFormat(row.income)}</MuiTableCell>
                            <MuiTableCell align="right">{priceFormat(row.sum)}</MuiTableCell>
                        </MuiTableRow>
                    ))}
                </MuiTableBody>
            </MuiTable>
        </Box>
    );
}
