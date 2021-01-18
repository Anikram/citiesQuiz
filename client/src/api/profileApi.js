const profileAPI = {
  async fetchUserProfile(token){
    return await fetch('http://localhost:5000/profile', {
      method: "GET",
      headers: {token: token}
    })
  },

  async updateUserTopScore(user_id,token,top_score) {
    const data = {user_id, token, top_score};
    const body = JSON.stringify(data)
    return await fetch('http://localhost:5000/profile', {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: body
    })
  }

}

export default profileAPI;