import React from 'react';
import MuiTypography from '@material-ui/core/Typography';
import MuiBox from "@material-ui/core/Box";

export default function Footer() {
    return (
        <MuiBox mt={4}>
            <MuiTypography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                Calculator
                {' '}
                {new Date().getFullYear()}
            </MuiTypography>
        </MuiBox>
    );
}
