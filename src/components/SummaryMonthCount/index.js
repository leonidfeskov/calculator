import React from 'react';
import { useSelector } from 'react-redux';
import MuiEventAvailableIcon from '@material-ui/icons/EventAvailable';

import Summary from '../common/Summary';

export default function SummaryMonthCount() {
    const { paymentSchedule: { summary } } = useSelector((state) => state);
    return (
        <Summary
            title="Срок кредита"
            icon={<MuiEventAvailableIcon fontSize="large" />}
            value={`${summary.monthCount} месяца`}
        />
    );
}
