import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BookmarksIcon from '@material-ui/icons/Bookmarks';

export const mainListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Кредитный калькулятор" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <BookmarksIcon />
            </ListItemIcon>
            <ListItemText primary="Сохраненные кредиты" />
        </ListItem>
    </div>
);
