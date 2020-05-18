import React from 'react';
import MuiGrid from '@material-ui/core/Grid';

import CreditStrategyForm from 'src/components/CreditStrategyForm';

export default function CreditStrategyPage() {
    return (
        <>
            <MuiGrid container spacing={4}>
                <MuiGrid item xs={12} md={12} lg={12}>
                    <CreditStrategyForm />
                </MuiGrid>
            </MuiGrid>
        </>
    );
}
