const authAPI = {
  async registerUser(data) {
    const response =  await fetch('http://localhost:5000/auth/register',{
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: data
    });

    return response
  },

  async isAuth(token) {
    const response = await fetch('http://localhost:5000/auth/is-verify', {
      method: "GET",
      headers: {token: token}
    })

    return response
  },

  async loginUser(body){
    const response = await fetch("http://localhost:5000/auth/login", {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: body
    })

    return response
  }
}

export default authAPI;