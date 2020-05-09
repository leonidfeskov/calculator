import React from 'react';
import MuiDashboardIcon from '@material-ui/icons/Dashboard';
import MuiBookmarksIcon from '@material-ui/icons/Bookmarks';

import MainPage from 'src/pages/Main';
import SavedCreditsPage from 'src/pages/SavedCredits';

const routes = [
    {
        path: '/',
        component: MainPage(),
        title: 'Кредитный калькулятор',
        menuIcon: <MuiDashboardIcon />,
    },
    {
        path: '/saved-credits',
        component: SavedCreditsPage(),
        title: 'Сохраненные кредиты',
        menuIcon: <MuiBookmarksIcon />,
    },
];

export default routes;
