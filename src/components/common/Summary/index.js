import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import MuiTypography from "@material-ui/core/Typography";

import Box from '../Box';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    icon: {
        width: 70,
        height: 70,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -theme.spacing(4),
        marginBottom: theme.spacing(4),
        backgroundColor: theme.palette.info.main,
        backgroundImage: `linear-gradient(to right, ${theme.palette.info.main}, ${theme.palette.info.dark})`,
        color: theme.palette.primary.contrastText,
        padding: theme.spacing(2),
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows['2']
    },
    content: {
        flexGrow: 1,
        marginLeft: theme.spacing(2),
        textAlign: 'right',
    }
}));

export default function Summary({ icon, title, value, children }) {
    const classes = useStyles();
    return (
        <Box>
            <div className={classes.root}>
                <div className={classes.icon}>{icon}</div>
                <div className={classes.content}>
                    <MuiTypography component="h3" className={classes.title}>{title}</MuiTypography>
                    <MuiTypography component="p" variant="h3">{value}</MuiTypography>
                </div>
            </div>
        </Box>
    )
}
