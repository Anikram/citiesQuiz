import usersAPI from "../api/usersAPI";

const initialState = {
  users: []
}

const GET_TOP_RANK_USERS = 'GET-TOP-RANK-USERS'

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOP_RANK_USERS:
      return {
        ...state,
        users: action.users
      }
    default:
      return state
  }
}

const setUsers = (users) => ({type: GET_TOP_RANK_USERS, users});

export const fetchTopUsers = () => async (dispatch) => {
  const response = await usersAPI.fetchTopUsers();
  const parseRes = await response.json();
  dispatch(setUsers(parseRes))
}



export default usersReducer;