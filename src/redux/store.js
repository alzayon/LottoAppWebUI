import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';

export default function configureStore(initialState) {
    return createStore(reducer,
        initialState,
        applyMiddleware(createLogger(),
        thunkMiddleware));
}
