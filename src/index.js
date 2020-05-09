import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'src/index.css';
import App from 'src/App';

import configureStore from 'src/store';

const store = configureStore();

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
