import authAPI from "../api/authAPI";
import {toast} from "react-toastify";
import profileAPI from "../api/profileApi";

const initialState = {
  profile: {user_name: 'Anikram', user_id: 'sdfsdf-sdfsdf-sdfsdf-sdfsdf', user_email: 'initial@email.com'},
  token: '',
  isAuthenticated: false
}

const SET_PROFILE = '/profile/SET-USER-PROFILE';
const SET_TOKEN = '/profile/SET-USER-TOKEN';
const TOGGLE_IS_AUTH = '/profile/TOGGLE-IS-AUTH';
const DELETE_TOKEN = '/profile/DELETE-USER-TOKEN';

const profileReducer = (state = initialState, action) => {
  switch(action.type) {
    case TOGGLE_IS_AUTH:
      return {
        ...state,
        isAuthenticated: action.bool
      }
    case SET_TOKEN:
      return {
        ...state,
        token: action.token
      }
    case SET_PROFILE:
      return {
        ...state,
        profile: {...action.profileData}
      }
    case DELETE_TOKEN:
      return {
        ...state,
        token: ''
      }
    default:
      return state
  }
}

export const setUserProfile = (profileData) => ({type: SET_PROFILE, profileData});
export const toggleAuthenticated = (bool) => ({type: TOGGLE_IS_AUTH, bool})
export const setUserToken = (token) => ({type: SET_TOKEN, token});
export const deleteUserToken = () => ({type: DELETE_TOKEN});

export const checkUserAuthenticated = (token) => async (dispatch, getState) => {
  const response = await authAPI.isAuth(token)
  if (response) {
    dispatch(toggleAuthenticated(true));
  } else {
    dispatch(toggleAuthenticated(false));
  }
}

export const setIsAuthenticated = (bool) => async (dispatch, getState) => {
  dispatch(toggleAuthenticated(bool))
}


export const loginUser = (email, password) => async (dispatch) => {
  const response = await authAPI.loginUser(email, password)
  const parseRes = await response.json()
  console.log('incoming token: '+ parseRes.token)

  if (parseRes.token) {
    dispatch(toggleAuthenticated(true))
    dispatch(setUserToken(parseRes.token))
    const response = await profileAPI.fetchUserProfile(parseRes.token)
    const parsed = await response.json();
    dispatch(setUserProfile(parsed))
    toast.success("Logged in successfully!")
  } else {
    console.log(parseRes)
    dispatch(toggleAuthenticated(false));
    if (parseRes.errors) {
      parseRes.errors.map(e => {
        toast.error(`${e.param} has ${e.msg}`)
      })
    } else {
      toast.error(parseRes)
    }
  }
}

export const setToken = (token) => async (dispatch, getState) => {
  dispatch(setUserToken(token))
}

export const fetchProfile = (token) => async (dispatch) => {
  const response = await profileAPI.fetchUserProfile(token)
  const parseRes = await response.json();
  if (parseRes.token !== '') {
    dispatch(setUserProfile(parseRes))
  } else {
    dispatch(toggleAuthenticated(false));
    if (parseRes.errors) {
      parseRes.errors.map(e => {
        toast.error(`${e.param} has ${e.msg}`)
      })
    } else {
      toast.error(parseRes)
    }
  }


}

export const deleteToken = () => async (dispatch) => {
  dispatch(deleteUserToken())
  dispatch(toggleAuthenticated(false))
}

export const registerUser = (email, password, name) => async (dispatch) => {
  const response = await authAPI.registerUser(email, password, name)


  const parseRes = await response.json();
  console.log(parseRes)

  if(parseRes.token){
    dispatch(loginUser(email, password));
    localStorage.setItem("token", parseRes.token);
    dispatch(setIsAuthenticated(true));
    dispatch(fetchProfile(parseRes.token))
    toast.success("Registered successfully!")
  } else {
    dispatch(setIsAuthenticated(false));

    if (parseRes.errors) {
      parseRes.errors.map(e => {
        toast.error(`${e.param} has ${e.msg}`)
      })
    } else {
      toast.error(parseRes)
    }
  }
}

export default profileReducer;