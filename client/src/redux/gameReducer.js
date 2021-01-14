import gameAPI from "../api/gameAPI";

const CREATE_GAME = "CREATE-GAME";
const LOAD_GAME_DATA = "LOAD-GAME-DATA";


const initialState = {
  game_id: '',
  cities: []
}

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_GAME_DATA:
      return {
        ...state,
        game_id: +action.gameData.game_id,
        cities: [...action.gameData.cities]
      }
    default:
      return state
  }
}

// const createGame = (user_id) = ({type: CREATE_GAME, user_id});
export const loadGameData = (gameData) => ({type: LOAD_GAME_DATA, gameData});

export const fetchGameData = (game_id) => async (dispatch, getState) => {
  const token = getState().profile.token;
  const gameData = await gameAPI.fetchGame(game_id, token);
  const parseRes = await gameData.json();
  dispatch(loadGameData(parseRes))
}

export const createNewGame = (user_id, region_name) => async (dispatch, getState) => {
  const token = getState().profile.token;
  const gameData = await gameAPI.createGame(user_id, token, region_name);
  const parseRes = await gameData.json();
  dispatch(loadGameData(parseRes))
}

export default gameReducer;