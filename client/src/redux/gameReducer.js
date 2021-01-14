import gameAPI from "../api/gameAPI";

const CREATE_GAME = "CREATE-GAME";
const LOAD_GAME_DATA = "LOAD-GAME-DATA";
const FINISH_CURRENT_GAME = "FINISH-CURRENT-GAME";
const CLEAR_GAME_DATA = "CLEAR-GAME-DATA";


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
        game_finished: action.gameData.game_finished,
        score: action.gameData.store,
        cities: [...action.gameData.cities]
      }
    case FINISH_CURRENT_GAME:
      return {
        ...state,
        game_finished: true
      }
    case CLEAR_GAME_DATA:
      return {
        ...state,
        game_id: null,
        game_finished: false,
        score: 0,
        cities: []
      }
    default:
      return state
  }
}

// const createGame = (user_id) = ({type: CREATE_GAME, user_id});
export const finishCurrentGame = () => ({type: FINISH_CURRENT_GAME});
export const clearGameData = () => ({type: CLEAR_GAME_DATA});
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

export const finishGame = (game_id,score) => async (dispatch,getState) => {
  const token = getState().profile.token;
  await gameAPI.finishGame(game_id,token,score);
  dispatch(finishCurrentGame())
}

export const deleteGame = (game_id) => async (dispatch,getState) => {
  const token = getState().profile.token;
  await gameAPI.deleteGame(game_id,token);
  dispatch(clearGameData())
}

export default gameReducer;