import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(4),
    },
}));

export default function Box({ children }) {
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            {children}
        </Paper>
    )
}
