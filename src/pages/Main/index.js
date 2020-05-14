import React from 'react';

import MuiGrid from '@material-ui/core/Grid';

import CreditForm from 'src/components/CreditForm';
import CreditCalculation from 'src/components/CreditCalculation';

export default function MainPage() {
    return (
        <>
            <MuiGrid container spacing={4}>
                <MuiGrid item xs={12} md={12} lg={12}>
                    <CreditForm />
                </MuiGrid>
            </MuiGrid>
            <CreditCalculation />
        </>
    );
}
