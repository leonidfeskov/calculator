import React from 'react';
import { TextField } from '@material-ui/core';

export default function Input(props) {
    return <TextField variant="outlined" size="small" fullWidth {...props} />;
}
