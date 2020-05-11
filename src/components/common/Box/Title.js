import React from 'react';
import MuiTypography from '@material-ui/core/Typography';

export default function Title(props) {
    return (
        <div className="box__title">
            <MuiTypography component="h2" variant="h6" color="primary">
                {props.children}
            </MuiTypography>
        </div>
    );
}
