const gameAPI = {
  fetchGame(body, token) {
    return fetch('/api/profile/game', {
      method: "GET",
      headers: {token: token, game_id: body}
    })
  },

  createGame(user_id, token, region_name) {
    const data = {user_id, token, region_name};
    const body = JSON.stringify(data)
    return fetch('/api/profile/game', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: body
    })
  },

  finishGame(game_id, token, score,distance,win) {
    const data = {game_id, token, score,distance,win};
    const body = JSON.stringify(data)
    return fetch('/api/profile/game', {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: body
    })
  },

  deleteGame(game_id, token) {
    const data = {game_id, token};
    const body = JSON.stringify(data)
    return fetch('/api/profile/game', {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      body: body
    })
  },

  getGames(token, user_id) {
    return fetch('/api/profile/games', {
      method: "GET",
      headers: {token: token, user_id: user_id}
    })
  }
}

export default gameAPI;