import axios from 'axios'
// const API_URL = 'http://localhost:8080/api/user'
const API_URL = 'https://practice20230930backend.onrender.com/api/user'

class AuthService {
  login(email, password) {
    return axios.post(API_URL+'/login', {
      email,
      password
    })
  }

  logout() {
    localStorage.removeItem('user')
  }

  register(username, email, password, role){
    return axios.post(API_URL+'/register', {
      username,
      email,
      password,
      role
    })
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'))
  }
}

let authService = new AuthService()

export default authService