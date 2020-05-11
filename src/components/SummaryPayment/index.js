import React from 'react';
import { useSelector } from 'react-redux';
import MuiAccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

import Summary from 'src/components/common/Summary';
import { priceFormat } from 'src/utils/common';

export default function SummaryPayment() {
    const {
        paymentSchedule: { summary },
    } = useSelector((state) => state);
    return (
        <Summary
            title="Минимальный платеж"
            icon={<MuiAccountBalanceWalletIcon />}
            value={priceFormat(summary.payment)}
            units="руб."
            footer={`${summary.onPercentage}% от этой суммы уйдет на погашение процентов в первый месяц`}
            iconType="info"
        />
    );
}
