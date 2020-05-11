import { createStore, combineReducers } from 'redux';
import credits from 'src/reducers/credits';
import creditParams from 'src/reducers/creditParams';
import paymentSchedule from 'src/reducers/paymentSchedule';

const configureStore = () => {
    return createStore(
        combineReducers({
            credits,
            creditParams,
            paymentSchedule,
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
};

export default configureStore;
