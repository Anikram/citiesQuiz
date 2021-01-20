import authAPI from "../api/authAPI";
import {toast} from "react-toastify";
import profileAPI from "../api/profileApi";
import gameAPI from "../api/gameAPI";
const jwt = require('jsonwebtoken');

const initialState = {
  profile: {user_name: 'Anikram', user_id: 'sdfsdf-sdfsdf-sdfsdf-sdfsdf', user_email: 'initial@email.com', top_score: 0},
  token: '',
  isAuthenticated: false,
  games: []
}

const SET_PROFILE = '/profile/SET-USER-PROFILE';
const SET_TOKEN = '/profile/SET-USER-TOKEN';
const TOGGLE_IS_AUTH = '/profile/TOGGLE-IS-AUTH';
const DELETE_TOKEN = '/profile/DELETE-USER-TOKEN';
const GET_USER_GAMES = '/profile/GET-USER-GAMES';


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
    case GET_USER_GAMES:
      return {
        ...state,
        games: action.games
      }
    default:
      return state
  }
}

export const setUserProfile = (profileData) => ({type: SET_PROFILE, profileData});
export const toggleAuthenticated = (bool) => ({type: TOGGLE_IS_AUTH, bool})
export const setUserToken = (token) => ({type: SET_TOKEN, token});
export const deleteUserToken = () => ({type: DELETE_TOKEN});
export const getUserGames = (games) => ({type: GET_USER_GAMES, games});



export const checkUserAuthenticated = (token) => async (dispatch, getState) => {
  const decodedToken = jwt.decode(token, {complete: true});
  const dateNow = new Date();

  if (!decodedToken) {dispatch(toggleAuthenticated(false));
  return}

  if (!token && decodedToken.exp < dateNow.getTime()) {
    dispatch(toggleAuthenticated(false));
    console.log('checking jwt expiration')
  } else {
    const response = await authAPI.isAuth(token)
    if (response.ok) {
      dispatch(toggleAuthenticated(true));
    } else {
      dispatch(toggleAuthenticated(false));
    }
  }
}

export const getGames = (user_id) => async (dispatch, getState) => {
  const token = getState().profile.token;
  const response = await gameAPI.getGames(token,user_id);
  const parseRes = await response.json();
  if (parseRes.error) {
    console.error(parseRes.error)
  } else {
    dispatch(getUserGames(parseRes));
  }
}

export const setIsAuthenticated = (bool) => async (dispatch) => {
  dispatch(toggleAuthenticated(bool))
}


export const loginUser = (email, password) => async (dispatch) => {
  const response = await authAPI.loginUser(email, password)
  const parseRes = await response.json()

  if (parseRes.token) {
    dispatch(toggleAuthenticated(true))
    dispatch(setUserToken(parseRes.token))
    const response = await profileAPI.fetchUserProfile(parseRes.token)
    const parsed = await response.json();
    dispatch(setUserProfile(parsed))
    toast.success("Logged in successfully!")
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

export const setTopScore = (user_id, top_score) => async (dispatch, getState) => {

  const response = await profileAPI.updateUserTopScore(user_id, getState().profile.token,top_score)
  const parseRes = await response.json();
  if (parseRes.errors) {
    toast.error(parseRes)
  } else {
    dispatch(setUserProfile(parseRes))
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