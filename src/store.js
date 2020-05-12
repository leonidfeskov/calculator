import { createStore, combineReducers } from 'redux';
import credits from 'src/reducers/credits';
import paymentSchedule from 'src/reducers/paymentSchedule';

const configureStore = () => {
    return createStore(
        combineReducers({
            credits,
            paymentSchedule,
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
};

export default configureStore;
