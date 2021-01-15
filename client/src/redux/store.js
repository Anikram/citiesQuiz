import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import profileReducer from "./profileReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import appReducer from "./appReducer";
import usersReducer from "./usersReducer";
import gameReducer from "./gameReducer";
import { reducer as formReducer } from 'redux-form'

let reducers = combineReducers({
  profile: profileReducer,
  app: appReducer,
  users: usersReducer,
  games: gameReducer,
  form: formReducer
});

const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(thunkMiddleware),
  // other store enhancers if any
));

window.store = store;

export default store;