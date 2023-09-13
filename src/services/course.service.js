import axios from 'axios'
// const API_URL = 'http://localhost:8080/api/course'
const API_URL = 'https://practice20230930backend.onrender.com/api/course'

class CourseService {
  
  post(title, description, price) {
    let token;
    if (JSON.parse(localStorage.getItem('user'))) {
      token = JSON.parse(localStorage.getItem('user')).token
    } else {
      token = ''
    }

    return axios.post(API_URL, {title, description, price}, {
      headers: {
        Authorization: token
      }
    })
  }

  get(_id) {
    let token;
    if (JSON.parse(localStorage.getItem('user'))) {
      token = JSON.parse(localStorage.getItem('user')).token
    } else {
      token = ''
    }

    return axios.get(API_URL+'/instructor/'+_id, {
      headers: {
        Authorization: token
      }
    })
  }

  getEnrolledCourses(_id) {
    let token;
    if (JSON.parse(localStorage.getItem('user'))) {
      token = JSON.parse(localStorage.getItem('user')).token
    } else {
      token = ''
    }

    return axios.get(API_URL+'/student/'+_id, {
      headers: {
        Authorization: token
      }
    })
  }

  getCourseByName(name) {
    let token;
    if (JSON.parse(localStorage.getItem('user'))) {
      token = JSON.parse(localStorage.getItem('user')).token
    } else {
      token = ''
    }

    return axios.get(API_URL+'/findbyname/'+name, {
      headers: {
        Authorization: token
      }
    })
  }

  // call register api
  enroll(_id) {
    let token;
    if (JSON.parse(localStorage.getItem('user'))) {
      token = JSON.parse(localStorage.getItem('user')).token
    } else {
      token = ''
    }

    console.log('id '+ _id)

    return axios.post(API_URL+'/enroll/'+_id, {}, {
      headers: {
        Authorization: token
      }
    })
  }
}

let courseService = new CourseService()

export default courseService