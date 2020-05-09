import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MuiDivider from '@material-ui/core/Divider';
import MuiList from '@material-ui/core/List';
import MuiDrawer from '@material-ui/core/Drawer/Drawer';
import MuiListItem from '@material-ui/core/ListItem';
import MuiListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import MuiDashboardIcon from '@material-ui/icons/Dashboard';
import MuiBookmarksIcon from '@material-ui/icons/Bookmarks';
import MuiListItemText from '@material-ui/core/ListItemText/ListItemText';

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

export default function Menu({ handleDrawerClose, isOpenMenu }) {
    const classes = useStyles();
    return (
        <MuiDrawer
            variant="permanent"
            classes={{
                paper: clsx(classes.drawerPaper, !isOpenMenu && classes.drawerPaperClose),
            }}
            open={isOpenMenu}
        >
            <div className={classes.toolbarIcon}>
                <MuiIconButton onClick={handleDrawerClose}>
                    <MuiChevronLeftIcon />
                </MuiIconButton>
            </div>
            <MuiDivider />
            <MuiList>
                <MuiListItem button>
                    <MuiListItemIcon>
                        <MuiDashboardIcon />
                    </MuiListItemIcon>
                    <MuiListItemText primary="Кредитный калькулятор" />
                </MuiListItem>
                <MuiListItem button>
                    <MuiListItemIcon>
                        <MuiBookmarksIcon />
                    </MuiListItemIcon>
                    <MuiListItemText primary="Сохраненные кредиты" />
                </MuiListItem>
            </MuiList>
        </MuiDrawer>
    );
}
