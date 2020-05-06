import React from "react";
import clsx from "clsx";
import MuiToolbar from "@material-ui/core/Toolbar";
import MuiIconButton from "@material-ui/core/IconButton";
import MuiMenuIcon from "@material-ui/icons/Menu";
import MuiTypography from "@material-ui/core/Typography";
import MuiAppBar from "@material-ui/core/AppBar/AppBar";
import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
    toolbar: {
        paddingRight: 24,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Header({ handleDrawerOpen, isOpenMenu }) {
    const classes = useStyles();
    return (
        <MuiAppBar position="absolute" className={clsx(classes.appBar, isOpenMenu && classes.appBarShift)}>
            <MuiToolbar className={classes.toolbar}>
                <MuiIconButton
                    edge="start"
                    color="inherit"
                    onClick={handleDrawerOpen}
                    className={clsx(classes.menuButton, isOpenMenu && classes.menuButtonHidden)}
                >
                    <MuiMenuIcon />
                </MuiIconButton>
                <MuiTypography component="h1" variant="h5" color="inherit" noWrap className={classes.title}>
                    Кредитный калькулятор
                </MuiTypography>
            </MuiToolbar>
        </MuiAppBar>
    )
}
