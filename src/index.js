import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import burgerBuilder from './store/reducers/burgerBuilder';
import order from './store/reducers/order';
import {BrowserRouter} from 'react-router-dom';
import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import authReducer from './store/reducers/auth';
import createSagaMiddleware from 'redux-saga';
import {watchAuth} from './store/sagas/index'; 

const composeEnhancers = process.env.NODE_ENV === 'development' 
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null|| compose;

const rootReducer = combineReducers({
    brg: burgerBuilder,
    order: order,
    auth: authReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer,composeEnhancers(
    applyMiddleware(thunk, sagaMiddleware)
));

sagaMiddleware.run(watchAuth);
const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
