import React from 'react';
import MuiTypography from '@material-ui/core/Typography';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(3)
    }
}));

export default function Title(props) {
    const classes = useStyles();
    return (
        <MuiTypography component="h2" variant="h6" color="primary" className={classes.root}>
            {props.children}
        </MuiTypography>
    );
}
