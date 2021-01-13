const usersAPI = {
  fetchTopUsers() {
    return fetch('http://localhost:5000/users', {
      method: "GET"
    })
  }
}

export default usersAPI;