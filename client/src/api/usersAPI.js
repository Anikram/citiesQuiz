const usersAPI = {
  fetchTopUsers() {
    return fetch('/api/users', {
      method: "GET"
    })
  }
}

export default usersAPI;