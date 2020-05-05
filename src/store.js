import { createStore, combineReducers } from 'redux';
import creditParams from './reducers/creditParams';
import paymentSchedule from './reducers/paymentSchedule';

const configureStore = () => {
    return createStore(
        combineReducers({
            creditParams,
            paymentSchedule,
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
};

export default configureStore;
