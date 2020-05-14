import React from 'react';
import { useSelector } from 'react-redux';
import MuiGrid from '@material-ui/core/Grid';
import MuiEventAvailableIcon from '@material-ui/icons/EventAvailable';
import MuiAttachMoneyIcon from '@material-ui/icons/AttachMoney';
import MuiAccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

import Summary from 'src/components/common/Summary';
import { formatDate } from 'src/utils/date';
import { priceFormat } from 'src/utils/common';

export default function CreditSummary() {
    const {
        creditData: { summary },
    } = useSelector((state) => state);
    return (
        <MuiGrid container spacing={4}>
            <MuiGrid item xs={12} md={4} lg={4}>
                <Summary
                    title="Срок кредита"
                    icon={<MuiEventAvailableIcon />}
                    value={summary.monthCount}
                    units="мес."
                    footer={`Последний платеж – ${formatDate(summary.lastPaymentDate)}`}
                    iconType="success"
                />
            </MuiGrid>
            <MuiGrid item xs={12} md={4} lg={4}>
                <Summary
                    title="Минимальный платеж"
                    icon={<MuiAccountBalanceWalletIcon />}
                    value={priceFormat(summary.payment)}
                    units="руб."
                    footer={`${summary.onPercentage}% от этой суммы уйдет на погашение процентов в первый месяц`}
                    iconType="info"
                />
            </MuiGrid>
            <MuiGrid item xs={12} md={4} lg={4}>
                <Summary
                    title="Переплата"
                    icon={<MuiAttachMoneyIcon />}
                    value={`${priceFormat(summary.overpayment)}`}
                    units="руб."
                    footer={`Это ${summary.overpaymentPercent}% от суммы кредита`}
                    iconType="warning"
                />
            </MuiGrid>
        </MuiGrid>
    );
}
