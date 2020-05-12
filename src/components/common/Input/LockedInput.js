import React from 'react';
import PropTypes from 'prop-types';

import MuiInputLabel from '@material-ui/core/InputLabel';
import MuiInputAdornment from '@material-ui/core/InputAdornment';
import Lock from '@material-ui/icons/Lock';
import LockOpen from '@material-ui/icons/LockOpen';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiFormControl from '@material-ui/core/FormControl';

import LargeInput from 'src/components/common/Input/LargeInput';

export default function LockedInput({ label, locked, lockDisabled, onChange, onChangeLocked, units, ...props }) {
    return (
        <MuiFormControl fullWidth>
            <MuiInputLabel>{label}</MuiInputLabel>
            <LargeInput
                {...props}
                onChange={onChange}
                // startAdornment={units ? <MuiInputAdornment position="start">{units}</MuiInputAdornment> : null}
                endAdornment={
                    <MuiInputAdornment position="end">
                        <MuiIconButton
                            aria-label={`Зафиксировать ${label}`}
                            onClick={() => onChangeLocked(!locked)}
                            disabled={!!lockDisabled}
                        >
                            {locked ? <Lock /> : <LockOpen />}
                        </MuiIconButton>
                    </MuiInputAdornment>
                }
            />
        </MuiFormControl>
    );
}

LockedInput.propTypes = {
    label: PropTypes.string,
    locked: PropTypes.bool,
    lockDisabled: PropTypes.bool,
    units: PropTypes.string,
    onChange: PropTypes.func,
    onLockChange: PropTypes.func,
};
