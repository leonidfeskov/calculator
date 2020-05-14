import React from 'react';
import { useSelector } from 'react-redux';

import MuiGrid from '@material-ui/core/Grid';
import MuiAlert from '@material-ui/lab/Alert';

import CreditSummary from 'src/components/CreditSummary';
import CreditDataTable from 'src/components/CreditDataTable';

const CreditCalculation = () => {
    const {
        creditData: { error },
    } = useSelector((state) => state);
    return error ? (
        <MuiGrid item xs={12}>
            <MuiAlert severity="error">{error}</MuiAlert>
        </MuiGrid>
    ) : (
        <>
            <CreditSummary />
            <MuiGrid container spacing={4}>
                <MuiGrid item xs={12}>
                    <CreditDataTable />
                </MuiGrid>
            </MuiGrid>
        </>
    );
};

export default CreditCalculation;
