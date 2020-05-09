import React from 'react';
import { useSelector } from 'react-redux';
import MuiEventAvailableIcon from '@material-ui/icons/EventAvailable';

import Summary from '../common/Summary';
import { formatDate } from '../../utils/date';

export default function SummaryMonthCount() {
    const { paymentSchedule: { summary } } = useSelector((state) => state);
    return (
        <Summary
            title="Срок кредита"
            icon={<MuiEventAvailableIcon fontSize="large" />}
            value={summary.monthCount}
            units="мес."
            footer={`Последний платеж – ${formatDate(summary.lastPaymentDate)}`}
            iconType="success"
        />
    );
}
