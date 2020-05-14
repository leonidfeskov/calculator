import { createStore, combineReducers } from 'redux';
import credits from 'src/reducers/credits';
import creditParams from 'src/reducers/creditParams';
import creditData from 'src/reducers/creditData';
import depositParams from 'src/reducers/depositParams';
import depositData from 'src/reducers/depositData';

const configureStore = () => {
    return createStore(
        combineReducers({
            credits,
            creditParams,
            creditData,
            depositParams,
            depositData,
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
};

export default configureStore;
