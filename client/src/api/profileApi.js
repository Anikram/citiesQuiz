const profileAPI = {
  async fetchUserProfile(token){
    return await fetch('/api/profile', {
      method: "GET",
      headers: {token: token}
    })
  },

  async updateUserTopScore(user_id,token,top_score) {
    const data = {user_id, token, top_score};
    const body = JSON.stringify(data)
    return await fetch('/api/profile', {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: body
    })
  }

}

export default profileAPI;