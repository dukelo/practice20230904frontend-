import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";


const EnrollComponent = (props) => {
  let { currentUser, setCurrentUser } = props
  let [ searchInput, setSearchInput ] = useState('')
  let [ searchResult, setSearchResult ] = useState('')

  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/login");
  };

  const handleChangeInput = (e) => {
    console.log(e.target.value)
    setSearchInput(e.target.value)
  }

  const handleSearch = () => {
    console.log(searchInput)
    CourseService.getCourseByName(searchInput).then((data) => {
      console.log(data)
      setSearchResult(data.data)
    }).catch((e) => {
      console.log(e)
    })
  }

  const handleEnroll = (e) => {
    console.log(e.target.id)
    CourseService.enroll(e.target.id).then(() => {
      // console.log('register success')
      window.alert('register success')
      navigate("/course");
    }).catch((e) => {
      console.log(e)
    })
  }


  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>Please login</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >submit
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role === "instructor" && (
        <div>
          <p>only student</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >submit
          </button>
        </div>
      )}

      {currentUser && currentUser.user.role === "student" && (
        <div>
          <p>Student</p>
          <input 
            type='text'
            className="form-control"
            onChange={handleChangeInput}
          />
          <br />
          <button onClick={handleSearch} className="btn btn-primary">Search</button>
        </div>
      )}      

      {currentUser && searchResult && searchResult.length != 0 && (
        <div>
          <p>這是我們從API返回的數據:</p>
          {searchResult.map((course) => {
            return (
              <div key={course._id} className="card" style={{ width: "18rem" }}>
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
                  <p style={{ margin: "0.5rem 0rem" }}>
                    講師: {course.instructor.username}
                  </p>

                  <a
                    href="#"
                    id={course._id}
                    className="card-text btn btn-primary"
                    onClick={handleEnroll}
                  >
                    註冊課程
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  )
}

export default EnrollComponent