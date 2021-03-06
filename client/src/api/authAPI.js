const authAPI = {
  async registerUser(email, password, name) {
    const data = {email, password, name};
    const body = JSON.stringify(data);
    return await fetch('/api/auth/register', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: body
    })
  },

  async isAuth(token) {
    return await fetch('/api/auth/is-verify', {
      method: "GET",
      headers: {token: token}
    })
  },

  async loginUser(email, password){
    const data = {email, password};
    const body = JSON.stringify(data);
    return await fetch("/api/auth/login", {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: body
    })
  }
}

export default authAPI;