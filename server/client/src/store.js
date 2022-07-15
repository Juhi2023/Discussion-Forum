
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoggedInReducer} from "./reducers/userReducers";
import {forumReducer} from "./reducers/forumReducer"
import {questionReducer} from "./reducers/forumReducer"


const rootReducer = combineReducers({
    userLoggedInReducer,
    forumReducer,
    questionReducer
})


const middleware = [thunk];

const store =createStore (rootReducer, composeWithDevTools(applyMiddleware(...middleware)))

export default store;