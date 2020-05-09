import MainPage from './pages/Main';
import SavedCreditsPage from './pages/SavedCredits';

const routes = [
    {
        path: '/',
        component: MainPage(),
        title: 'Кредитный калькулятор',
    },
    {
        path: '/saved-credits',
        component: SavedCreditsPage(),
        title: 'Сохраненные кредиты',
    },
];

export default routes;
