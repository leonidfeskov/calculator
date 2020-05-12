import React from 'react';
import PropTypes from 'prop-types';

import MuiInputLabel from '@material-ui/core/InputLabel';
// import MuiInputAdornment from '@material-ui/core/InputAdornment';
import MuiFormControl from '@material-ui/core/FormControl';

import LargeInput from 'src/components/common/Input/LargeInput';

export default function Input({ label, onChange, units, ...props }) {
    return (
        <MuiFormControl fullWidth>
            <MuiInputLabel>{label}</MuiInputLabel>
            <LargeInput
                {...props}
                onChange={onChange}
                // startAdornment={units ? <MuiInputAdornment position="start">{units}</MuiInputAdornment> : null}
            />
        </MuiFormControl>
    );
}

Input.propTypes = {
    label: PropTypes.string,
    // units: PropTypes.string,
    onChange: PropTypes.func,
};
