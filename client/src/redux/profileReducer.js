import authAPI from "../api/authAPI";
import {toast} from "react-toastify";

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

export const checkUserAuthenticated = () => async (dispatch, getState) => {
  const response = await authAPI.isAuth(getState().profile.token)
  if (response.status !== 200) {
    const parseRes = await response.json();
    console.error(parseRes)
    dispatch(toggleAuthenticated(false));
  } else {
    dispatch(toggleAuthenticated(true));
  }
}

export const setIsAuthenticated = (bool) => async (dispatch, getState) => {
  dispatch(toggleAuthenticated(bool))
}


export const loginUser = (data) => async (dispatch) => {
  const response = await authAPI.loginUser(JSON.stringify(data))

  const parseRes = await response.json()

  if (parseRes.token) {
    dispatch(toggleAuthenticated(true))
    dispatch(setUserToken(parseRes.token))
    const response = await authAPI.fetchUserProfile(parseRes.token)
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
  const response = await authAPI.fetchUserProfile(token)
  const parseRes = await response.json();
  if (parseRes.token !== '') {
    dispatch(setUserProfile(parseRes))
  } else {
    console.log('fetchProfile else branch '+parseRes)
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

export default profileReducer;