import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import MuiTable from '@material-ui/core/Table';
import MuiTableBody from '@material-ui/core/TableBody';
import MuiTableCell from '@material-ui/core/TableCell';
import MuiTableHead from '@material-ui/core/TableHead';
import MuiTableRow from '@material-ui/core/TableRow';
import MuiButton from '@material-ui/core/Button';
import MuiGrid from '@material-ui/core/Grid';

import Box from 'src/components/common/Box';
import BoxTitle from 'src/components/common/Box/Title';
import { priceFormat } from 'src/utils/common';
import { formatDate } from 'src/utils/date';

// В первой строке нулевой платёж,
// сдвигаем всё на 1 вперёд
const SHIFT = 1;
const MONTHS_PER_PAGE = 30;

export default function DepositDataTable() {
    const { depositData } = useSelector((state) => state);

    const [visibleRows, setVisibleRows] = useState(0);
    useEffect(() => {
        setVisibleRows(MONTHS_PER_PAGE);
    }, [depositData]);
    const rows = depositData.table.slice(SHIFT, visibleRows + SHIFT);
    const totalRows = depositData.table.length - SHIFT;
    const restOfRows = Math.max(totalRows - visibleRows, 0);
    const nextRows = restOfRows < MONTHS_PER_PAGE * 1.3 ? restOfRows : MONTHS_PER_PAGE;
    const showMoreRows = useCallback(() => {
        setVisibleRows(visibleRows + nextRows);
    }, [nextRows, visibleRows]);

    return useMemo(
        () => (
            <>
                <BoxTitle>Вклад по месяцам</BoxTitle>
                <Box>
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
                            {rows.map((row, index) => (
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
                    {nextRows ? (
                        <MuiGrid item xs={12} onClick={showMoreRows}>
                            <MuiButton color="primary">{`Показать ещё ${nextRows}`}</MuiButton>
                        </MuiGrid>
                    ) : null}
                </Box>
            </>
        ),
        [nextRows, rows, showMoreRows]
    );
}
