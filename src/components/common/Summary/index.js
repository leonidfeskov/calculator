import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MuiTypography from '@material-ui/core/Typography';
import MuiDivider from '@material-ui/core/Divider';

import Box from 'src/components/common/Box';

const useStyles = makeStyles((theme) => ({
    icon: {
        width: 80,
        height: 80,
        position: 'absolute',
        top: -theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.info.main,
        backgroundImage: `linear-gradient(to right, ${theme.palette.info.main}, ${theme.palette.info.dark})`,
        color: theme.palette.primary.contrastText,
        padding: theme.spacing(2),
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows['2'],
    },
    iconColorSuccess: {
        backgroundColor: theme.palette.success.main,
        backgroundImage: `linear-gradient(to right, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
    },
    iconColorWarning: {
        backgroundColor: theme.palette.warning.main,
        backgroundImage: `linear-gradient(to right, ${theme.palette.warning.main}, ${theme.palette.warning.dark})`,
    },
    content: {
        flexGrow: 1,
        marginLeft: 100,
        textAlign: 'right',
        marginBottom: theme.spacing(2),
    },
    footer: {
        marginTop: theme.spacing(2),
    },
}));

export default function Summary({ icon, iconType, title, value, units, footer }) {
    const classes = useStyles();
    return (
        <Box>
            <div
                className={clsx(
                    classes.icon,
                    iconType === 'success' && classes.iconColorSuccess,
                    iconType === 'warning' && classes.iconColorWarning
                )}
            >
                {icon}
            </div>
            <div className={classes.content}>
                <MuiTypography component="h3" variant="h6" color="textSecondary">
                    {title}
                </MuiTypography>
                <MuiTypography component="p" variant="h3">
                    {value}
                    <MuiTypography component="span" variant="h5">
                        {' '}
                        {units}
                    </MuiTypography>
                </MuiTypography>
            </div>
            <MuiDivider />
            <div className={classes.footer}>
                <MuiTypography component="p" color="textSecondary">
                    {footer}
                </MuiTypography>
            </div>
        </Box>
    );
}
