import React from 'react';
import MuiGrid from '@material-ui/core/Grid';

import DepositForm from 'src/components/DepositForm';
import DepositDataTable from 'src/components/DepositDataTable';

export default function DepositPage() {
    return (
        <>
            <MuiGrid container spacing={4}>
                <MuiGrid item xs={12} md={12} lg={12}>
                    <DepositForm />
                </MuiGrid>
            </MuiGrid>
            <MuiGrid container spacing={4}>
                <MuiGrid item xs={12}>
                    <DepositDataTable />
                </MuiGrid>
            </MuiGrid>
        </>
    );
}
