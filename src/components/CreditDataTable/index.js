import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import MuiGrid from '@material-ui/core/Grid';
import MuiButton from '@material-ui/core/Button';

// В первой строке нулевой платёж,
// сдвигаем всё на 1 вперёд
const SHIFT = 1;
const MONTHS_PER_PAGE = 30;

export default function CreditDataTable() {
    const { creditData } = useSelector((state) => state);

    const [visibleRows, setVisibleRows] = useState(0);
    useEffect(() => {
        setVisibleRows(MONTHS_PER_PAGE);
    }, [creditData]);
    const rows = creditData.table.slice(SHIFT, visibleRows + SHIFT);
    const totalRows = creditData.table.length - SHIFT;
    const restOfRows = Math.max(totalRows - visibleRows, 0);
    const nextRows = restOfRows < MONTHS_PER_PAGE * 1.3 ? restOfRows : MONTHS_PER_PAGE;
    const showMoreRows = useCallback(() => {
        setVisibleRows(visibleRows + nextRows);
    }, [nextRows, visibleRows]);

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
                        {rows.map((row) => (
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
                {nextRows ? (
                    <MuiGrid item xs={12} onClick={showMoreRows}>
                        <MuiButton color="primary">{`Показать ещё ${nextRows}`}</MuiButton>
                    </MuiGrid>
                ) : null}
            </Box>
        ),
        [nextRows, rows, showMoreRows]
    );
}
