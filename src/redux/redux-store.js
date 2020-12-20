import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import rodsAndNodesReducer from "../reducers/reducer";
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from "redux-thunk";

let reduxStore = createStore(
    combineReducers({
        rodsAndNodes: rodsAndNodesReducer,
    }),
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);

export default reduxStore;
