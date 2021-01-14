const profileAPI = {
  async fetchUserProfile(token){
    const response = await fetch('http://localhost:5000/profile', {
      method: "GET",
      headers: {token: token}
    })

    return response
  }
}

export default profileAPI;