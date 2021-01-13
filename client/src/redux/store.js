import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import profileReducer from "./profileReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import appReducer from "./appReducer";
import usersReducer from "./usersReducer";

let reducers = combineReducers({
  profile: profileReducer,
  app: appReducer,
  users: usersReducer
});

const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(thunkMiddleware),
  // other store enhancers if any
));

window.store = store;

export default store;