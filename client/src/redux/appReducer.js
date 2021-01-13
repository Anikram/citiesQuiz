import authAPI from "../api/authAPI";
import {checkUserAuthenticated, fetchProfile, setToken} from "./profileReducer";


const INITIALIZATION_SUCCESS = "/app/INITIALIZATION-SUCCESS";

const initialState = {
  initialized: false
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZATION_SUCCESS:
      return {
        ...state,
        initialized: true
      }
    default:
      return state;
  }

}
const initializingSuccess = () => ({type: INITIALIZATION_SUCCESS});

export const initializeApp = (token) => async (dispatch, getState) => {
  dispatch(setToken(token))
  dispatch(checkUserAuthenticated())
  dispatch(fetchProfile())
  dispatch(initializingSuccess());
}

export default appReducer;