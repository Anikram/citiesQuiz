const gameAPI = {
  fetchGame(body, token) {
    const response = fetch('http://localhost:5000/profile/game', {
      method: "GET",
      headers: {token: token, game_id: body}
    })

    return response
  },

  createGame(user_id, token) {
    const data = {user_id, token};
    const body = JSON.stringify(data)
    const response = fetch('http://localhost:5000/profile/game', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: body
    })

    return response
  }
}

export default gameAPI;