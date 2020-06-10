import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk'
import airports from './airports'
import flightPath from './flightPath'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    airports,
    flightPath,

});

const configureStore = () => {
    return createStore(reducer, {}, composeEnhancers(applyMiddleware(thunk)));
}

export default configureStore;
