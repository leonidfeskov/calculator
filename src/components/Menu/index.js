import React, { useState } from "react";
import { Link } from 'react-router-dom';
import clsx from "clsx";
import {makeStyles} from "@material-ui/core/styles";
import MuiIconButton from "@material-ui/core/IconButton";
import MuiChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MuiMenuIcon from '@material-ui/icons/Menu';
import MuiDivider from "@material-ui/core/Divider";
import MuiList from "@material-ui/core/List";
import MuiDrawer from "@material-ui/core/Drawer/Drawer";
import MuiListItem from "@material-ui/core/ListItem";
import MuiListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import MuiListItemText from "@material-ui/core/ListItemText/ListItemText";

import routes from "../../routes";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
}));

export default function Menu() {
    const classes = useStyles();

    const [open, setOpen] = useState(true);
    const handleMenuOpen = () => {
        setOpen(true);
    };
    const handleMenuClose = () => {
        setOpen(false);
    };

    return (
        <MuiDrawer
            variant="permanent"
            classes={{
                paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}
        >
            <div className={classes.toolbarIcon}>
                {open ? (
                    <MuiIconButton onClick={handleMenuClose}>
                        <MuiChevronLeftIcon />
                    </MuiIconButton>
                ) : (
                    <MuiIconButton onClick={handleMenuOpen}>
                        <MuiMenuIcon />
                    </MuiIconButton>
                )}
            </div>
            <MuiDivider />
            <MuiList>
                {routes.map((route, index) => (
                    <MuiListItem key={index} button component={Link} to={route.path}>
                        <MuiListItemIcon>
                            {route.menuIcon}
                        </MuiListItemIcon>
                        <MuiListItemText primary={route.title} />
                    </MuiListItem>
                ))}
            </MuiList>
        </MuiDrawer>
    )
}
