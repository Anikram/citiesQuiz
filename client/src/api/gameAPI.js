const gameAPI = {
  fetchGame(body, token) {
    return fetch('http://localhost:5000/profile/game', {
      method: "GET",
      headers: {token: token, game_id: body}
    })
  },

  createGame(user_id, token, region_name) {
    const data = {user_id, token, region_name};
    const body = JSON.stringify(data)
    return fetch('http://localhost:5000/profile/game', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: body
    })
  },

  finishGame(game_id, token) {
    const data = {game_id, token};
    const body = JSON.stringify(data)
    return fetch('http://localhost:5000/profile/game', {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: body
    })
  },

  deleteGame(game_id, token) {
    const data = {game_id, token};
    const body = JSON.stringify(data)
    return fetch('http://localhost:5000/profile/game', {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      body: body
    })
  }
}

export default gameAPI;