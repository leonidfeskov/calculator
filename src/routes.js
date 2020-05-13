import React from 'react';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import BookmarksIcon from '@material-ui/icons/Bookmarks';

import MainPage from 'src/pages/Main';
import DepositPage from 'src/pages/Deposit';
import SavedCreditsPage from 'src/pages/SavedCredits';
import CompareCreditsPage from 'src/pages/CompareCredits';

const routes = [
    {
        path: '/',
        component: MainPage(),
        title: 'Кредитный калькулятор',
        menuIcon: <CreditCardIcon />,
    },
    {
        path: '/deposit',
        component: DepositPage(),
        title: 'Калькулятор вклада',
        menuIcon: <MonetizationOnIcon />,
    },
    {
        path: '/compare-credits',
        component: CompareCreditsPage(),
        title: 'Сравнение кредитов',
        menuIcon: <CompareArrowsIcon />,
    },
    {
        path: '/saved-credits',
        component: SavedCreditsPage(),
        title: 'Сохраненные кредиты',
        menuIcon: <BookmarksIcon />,
    },
];

export default routes;
