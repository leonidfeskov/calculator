import 'date-fns';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'src/index.css';
import App from 'src/App';

import configureStore from 'src/store';

const store = configureStore();

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <App />
            </MuiPickersUtilsProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
