import React, { useEffect } from 'react'
import Nav from 'react-bootstrap/Nav'

import { useAuth } from '@/contexts/Auth'
import { useProfile } from '@/contexts/Profile'
import { useWorkout } from '@/contexts/Workout'

import ModalsWeightsNew from '@/modals/weight/New'
import ModalsWorkoutsNew from '@/modals/workout/New'
import ModalsWorkoutsEdit from '@/modals/workout/Edit'
import ModalsProfileEdit from '@/modals/profile/Edit'

import WeightChart from '@/components/WeightChart'
import Bmi from '@/components/Bmi'
import WeightCountDown from '@/components/WeightCountDown'
import MonWorkout from '@/components/MonWorkout'
import TueWorkout from '@/components/TueWorkout'
import WedWorkout from '@/components/WedWorkout'
import ThurWorkout from '@/components/ThurWorkout'
import FriWorkout from '@/components/FriWorkout'
import SatWorkout from '@/components/SatWorkout'
import SunWorkout from '@/components/SunWorkout'

function PagesProfile() {
  const { show: { data: currentUser }, logout } = useAuth()

  const {
    apis: { getMyWeights },
    modals: {
      editWeightModal,
      openEditProfileModal,
      closeEditProfileModal,
      newWeightModal,
      openNewWeightModal,
      closeNewWeightModal
    } } = useProfile()

  const {
    modals: {
      newWorkoutModal,
      openNewWorkoutModal,
      closeNewWorkoutModal,
      editWorkoutModal,
      openEditWorkoutModal,
      closeEditWorkoutModal
    } } = useWorkout()

  useEffect(() => {
    getMyWeights()
  }, [])

  return (
    <>
      <div id="pages-dashboard" className="row m-3">
        <div className="dashboard-left col d-flex flex-column">
          <div className="top d-flex flex-column">
            <div className="d-flex justify-content-between">
              <h2><span>Profile</span></h2>
              <div className="profile-btn">
                <button
                  type="button"
                  id="edit-profile-btn"
                  onClick={openEditProfileModal}
                >
                  Edit Profile
                </button>
              </div>
            </div>
            <div className="d-flex  mb-3">
              <div id="profile-box" className="d-flex flex-column flex-fill align-items-center p-3">
                <div className="profile-img mb-3" />
                <div className="user-info text-center">
                  <p className="m-0">username: {currentUser.username}</p>
                  <p>email: {currentUser.email}</p>
                </div>
                <div className="measurements d-flex text-center">
                  <div className="height">
                    <h3>Height</h3>
                    <p>{currentUser.height} cm</p>
                  </div>
                  <div className="target-weight">
                    <h3>Target Weight</h3>
                    <p>{currentUser.targetWeight} kg</p>
                  </div>
                </div>
                <Nav.Link onClick={logout} id="logout-btn">Logout</Nav.Link>
              </div>

              <div className="stats d-flex flex-column flex-fill">
                <div id="bmi-box" className="d-flex flex-column align-items-center justify-content-center text-center">
                  <Bmi />
                </div>
                <div id="weight-goal-box" className="d-flex flex-column align-items-center justify-content-center mt-3 text-center">
                  <WeightCountDown />
                </div>
              </div>
            </div>
          </div>

          <div className="bottom">
            <div className="d-flex justify-content-between">
              <h2><span>Weight Tracker</span></h2>
              <button
                type="button"
                onClick={openNewWeightModal}
              >
                Add Weight
              </button>

            </div>
            <div id="weights-box">
              <WeightChart />
            </div>
          </div>
        </div>

        <div className="dashboard-right col">
          <div id="workouts-box">
            <div className="d-flex justify-content-between">
              <h2><span>Workout Routine</span></h2>
              <div className="workout-btn">
                <button
                  id="add-workout-btn"
                  type="button"
                  onClick={openNewWorkoutModal}
                >
                  Add Workout</button>
                <button
                  type="button"
                  onClick={openEditWorkoutModal}
                >Edit Workout</button>
              </div>
            </div>
            <div id="workouts" className="d-flex flex-wrap justify-content-between">
              <div className="day-boxes d-flex flex-column">
                <div id="mon" className="day-title text-center">Mon</div>
                <div className="day-box p-3"><MonWorkout /></div>
              </div>
              <div className="day-boxes d-flex flex-column">
                <div id="tue" className="day-title text-center">Tue</div>
                <div className="day-box p-3"><TueWorkout /></div>
              </div>
              <div className="day-boxes d-flex flex-column">
                <div id="wed" className="day-title text-center">Wed</div>
                <div className="day-box p-3"><WedWorkout /></div>
              </div>
              <div className="day-boxes d-flex flex-column">
                <div id="thur" className="day-title text-center">Thur</div>
                <div className="day-box p-3 "><ThurWorkout /></div>
              </div>
              <div className="day-boxes d-flex flex-column">
                <div id="fri" className="day-title text-center">Fri</div>
                <div className="day-box p-3"><FriWorkout /></div>
              </div>
              <div className="day-boxes d-flex flex-column">
                <div id="sat" className="day-title text-center">Sat</div>
                <div className="day-box p-3"><SatWorkout /></div>
              </div>
              <div className="day-boxes d-flex flex-column">
                <div id="sun" className="day-title text-center">Sun</div>
                <div className="day-box p-3"><SunWorkout /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalsProfileEdit show={editWeightModal} handleClose={closeEditProfileModal} />
      <ModalsWeightsNew show={newWeightModal} handleClose={closeNewWeightModal} />
      <ModalsWorkoutsNew show={newWorkoutModal} handleClose={closeNewWorkoutModal} />
      <ModalsWorkoutsEdit show={editWorkoutModal} handleClose={closeEditWorkoutModal} />
    </>
  )
}

export default PagesProfile
