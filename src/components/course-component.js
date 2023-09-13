import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CourseService from '../services/course.service'

const CourseComponent = ({currentUser, setCurrentUser}) => {
  const navigate = useNavigate()

  let [courseData, setCourseData] = useState(null);

  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id
      console.log(_id)
      if(currentUser.user.role === 'instructor') {
        CourseService.get(_id).then((data) => {
          console.log(data.data)
          setCourseData(data.data)
        })

      } else if (currentUser.user.role === 'student') {
        CourseService.getEnrolledCourses(_id).then((data) => {
          console.log(data.data)
          setCourseData(data.data)
        })
      }
    }
  }, [])


  const handleTakeToLogin = () => {
    navigate('/login')
  }

  return (
    <div style={{padding: '3rem'}}>
      { !currentUser && <div>
          <p>must login first</p>
          <button className='btn btn-primary btn-lg' onClick={handleTakeToLogin}>login</button>
        </div>}

      { currentUser && currentUser.user.role === 'instructor' && (
        <h1>welcome instructor</h1>
      )}

      { currentUser && currentUser.user.role === 'student' && (
        <h1>welcome student</h1>
      )}

      {currentUser && courseData && courseData.length !== 0 && (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {courseData.map((course) => {
            return (
              <div className="card" style={{ width: "18rem", margin: "1rem" }}>
                <div className="card-body">
                  <h5 className="card-title">課程名稱:{course.title}</h5>
                  <p style={{ margin: "0.5rem 0rem" }} className="card-text">
                    {course.description}
                  </p>
                  <p style={{ margin: "0.5rem 0rem" }}>
                    學生人數: {course.students.length}
                  </p>
                  <p style={{ margin: "0.5rem 0rem" }}>
                    課程價格: {course.price}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  )
}

export default CourseComponent