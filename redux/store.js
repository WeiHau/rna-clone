import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers";

const initialState = {};

const middleware = [thunk];

const enhancer = compose(applyMiddleware(...middleware));

const reducer = combineReducers(reducers);
const store = createStore(reducer, initialState, enhancer);

export default store;
