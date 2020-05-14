import React from 'react';
import { useSelector } from 'react-redux';
import MuiGrid from '@material-ui/core/Grid';
import MuiEventAvailableIcon from '@material-ui/icons/EventAvailable';
import MuiAttachMoneyIcon from '@material-ui/icons/AttachMoney';
import MuiAccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

import Summary from 'src/components/common/Summary';
import { formatDate } from 'src/utils/date';
import { priceFormat } from 'src/utils/common';

export default function DepositSummary() {
    const {
        depositData: { summary },
    } = useSelector((state) => state);

    return (
        <MuiGrid container spacing={4}>
            <MuiGrid item xs={12} md={4} lg={4}>
                <Summary
                    title="Срок кредита"
                    icon={<MuiEventAvailableIcon />}
                    value={summary.period}
                    units="мес."
                    footer={`Дата выплаты вклада – ${formatDate(summary.endDate)}`}
                    iconType="success"
                />
            </MuiGrid>
            <MuiGrid item xs={12} md={4} lg={4}>
                <Summary
                    title="Доход от процентов"
                    icon={<MuiAccountBalanceWalletIcon />}
                    value={priceFormat(summary.totalIncome)}
                    units="руб."
                    iconType="info"
                />
            </MuiGrid>
            <MuiGrid item xs={12} md={4} lg={4}>
                <Summary
                    title="Итоговая сумма вклада"
                    icon={<MuiAttachMoneyIcon />}
                    value={priceFormat(summary.totalSum)}
                    units="руб."
                    iconType="warning"
                />
            </MuiGrid>
        </MuiGrid>
    );
}
