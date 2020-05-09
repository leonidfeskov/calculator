import React from 'react';
import MuiGrid from '@material-ui/core/Grid';

import CreditForm from '../../components/CreditForm';
import SummaryMonthCount from '../../components/SummaryMonthCount';
import SummaryOverpayment from '../../components/SummaryOverpayment';
import PaymentSchedule from '../../components/PaymentSchedule';

export default function MainPage() {
    return (
        <>
            <MuiGrid container spacing={4}>
                <MuiGrid item xs={12} md={12} lg={12}>
                    <CreditForm />
                </MuiGrid>
            </MuiGrid>
            <MuiGrid container spacing={4}>
                <MuiGrid item xs={12} md={6} lg={6}>
                    <SummaryMonthCount />
                </MuiGrid>
                <MuiGrid item xs={12} md={6} lg={6}>
                    <SummaryOverpayment />
                </MuiGrid>
            </MuiGrid>
            <MuiGrid container spacing={4}>
                <MuiGrid item xs={12}>
                    <PaymentSchedule />
                </MuiGrid>
            </MuiGrid>
        </>
    );
}
