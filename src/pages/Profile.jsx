import React from 'react'
import Nav from 'react-bootstrap/Nav'

import { useAuth } from '@/contexts/Auth'
import ModalsWeightsNew from '@/modals/weight/New'
// import ModalsProfileEdit from '@/modals/profile/Edit'

function PagesProfile() {
  const { show: { data: currentUser }, logout } = useAuth()

  return (
    <div id="pages-dashboard" className="row m-5">
      <div className="dashboard-left col d-flex flex-column">
        <div className="top d-flex flex-column">
          <div className="d-flex justify-content-between">
            <h2>Profile</h2>
            <div className="profile-btn">
              <button id="edit-profile-btn">Edit Profile</button>
            </div>
          </div>
          <div className="d-flex  mb-3">
            <div id="profile-box" className="d-flex flex-column flex-fill align-items-center p-3">
              <div className="profile-img mb-3" />
              <div className="user-info text-center">
                <p className="m-0">username: john1234</p>
                <p>email: john1234@gmail.com</p>
              </div>
              <div className="measurements d-flex text-center">
                <div className="height">
                  <h3>User Height</h3>
                  <p>182cm</p>
                </div>
                <div className="target-weight">
                  <h3>Target Weight</h3>
                  <p>80kg</p>
                </div>
              </div>
              <Nav.Link onClick={logout} id="logout-btn">Logout</Nav.Link>
            </div>

            <div className="stats d-flex flex-column flex-fill">
              <div id="bmi-box" className="d-flex flex-column align-items-center justify-content-center">
                <h2>24</h2>
                <p>your current BMI</p>
              </div>
              <div id="weight-goal-box" className="d-flex flex-column align-items-center justify-content-center mt-3">
                <h2>8KG</h2>
                <p>till your target weight</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom">
          <div className="d-flex justify-content-between">
            <h2>Weight Tracker</h2>
            <button>Add Weight</button>
          </div>
          <div id="weights-box" />
        </div>
      </div>

      <div className="dashboard-right col">
        <div id="workouts-box">
          <div className="d-flex justify-content-between">
            <h2>Workout Routine</h2>
            <div className="workout-btn">
              <button id="add-workout-btn">Add Workout</button>
              <button>Edit Workout</button>
            </div>
          </div>
          <div id="workouts">
            mon
          </div>
        </div>
      </div>

    </div>
  )
}

export default PagesProfile
