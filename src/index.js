import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import reducer from './store/reducers/reducer';

import {BrowserRouter} from 'react-router-dom';
import {combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';

const rootReducer = combineReducers({
    brg: reducer,
});

const store = createStore(rootReducer);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
