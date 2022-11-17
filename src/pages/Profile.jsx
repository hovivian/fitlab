import React from 'react'
import { Link } from 'react-router-dom'

function PagesProfile() {
  return (
    <div id="pages-dashboard" className="row">
      <div className="dashboard-left col d-flex">
        <div id="profile-box">profile</div>
        <div id="bmi-box">bmi</div>
        <div id="weights-box">weights</div>
        <div id="weight-goal-box" />
        <div className="dashboard-right col">
          <div id="workouts-box">
            <h2>Workout Routine</h2>
            <div id="workouts">
              mon
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default PagesProfile
