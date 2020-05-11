import React from 'react';
import MuiGrid from '@material-ui/core/Grid';

import CreditForm from 'src/components/CreditForm';
import SummaryMonthCount from 'src/components/SummaryMonthCount';
import SummaryPayment from 'src/components/SummaryPayment';
import SummaryOverpayment from 'src/components/SummaryOverpayment';
import PaymentsChart from 'src/components/PaymentsChart';
import OverpaymentChart from 'src/components/OverpaymentChart';
import PaymentScheduleTable from 'src/components/PaymentScheduleTable';

export default function MainPage() {
    return (
        <>
            <MuiGrid container spacing={4}>
                <MuiGrid item xs={12} md={12} lg={12}>
                    <CreditForm />
                </MuiGrid>
            </MuiGrid>
            <MuiGrid container spacing={4}>
                <MuiGrid item xs={12} md={4} lg={4}>
                    <SummaryMonthCount />
                </MuiGrid>
                <MuiGrid item xs={12} md={4} lg={4}>
                    <SummaryPayment />
                </MuiGrid>
                <MuiGrid item xs={12} md={4} lg={4}>
                    <SummaryOverpayment />
                </MuiGrid>
            </MuiGrid>
            <MuiGrid container spacing={4}>
                <MuiGrid item xs={12}>
                    <OverpaymentChart />
                </MuiGrid>
            </MuiGrid>
            <MuiGrid container spacing={4}>
                <MuiGrid item xs={12}>
                    <PaymentsChart />
                </MuiGrid>
            </MuiGrid>
            <MuiGrid container spacing={4}>
                <MuiGrid item xs={12}>
                    <PaymentScheduleTable />
                </MuiGrid>
            </MuiGrid>
        </>
    );
}
