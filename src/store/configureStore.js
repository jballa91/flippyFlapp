import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import airports from "./airports";
import flightPath from "./flightPath";
import airplanes from "./airplanes";
import flightPlans from './flightPlans';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  airports,
  flightPath,
  airplanes,
  flightPlans
});

const configureStore = () => {
  return createStore(reducer, {}, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;
