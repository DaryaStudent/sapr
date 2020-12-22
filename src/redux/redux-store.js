import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import rodsAndVortexsReducer from "../reducers/reducer";
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from "redux-thunk";

let reduxStore = createStore(
    combineReducers({
        rodsAndVortexs: rodsAndVortexsReducer,
    }),
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);

export default reduxStore;
