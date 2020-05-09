import MuiDashboardIcon from "@material-ui/icons/Dashboard";
import MuiBookmarksIcon from "@material-ui/icons/Bookmarks";

import MainPage from './pages/Main';
import SavedCreditsPage from './pages/SavedCredits';
import React from "react";

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
        menuIcon: <MuiBookmarksIcon />
    },
];

export default routes;
