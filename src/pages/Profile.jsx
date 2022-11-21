import React, { useEffect } from 'react'
import Nav from 'react-bootstrap/Nav'

import { useAuth } from '@/contexts/Auth'

import { useProfile } from '@/contexts/Profile'
import ModalsWeightsNew from '@/modals/weight/New'
import ModalsProfileEdit from '@/modals/profile/Edit'
import { data } from 'autoprefixer'

function PagesProfile() {
  const { show: { data: currentUser }, logout } = useAuth()

  const {
    index: { data: weight },
    apis: { getMyWeights },
    modals: {
      editWeightModal,
      openEditProfileModal,
      closeEditProfileModal,
      newWeightModal,
      openNewWeightModal,
      closeNewWeightModal
    } } = useProfile()

  useEffect(() => {
    getMyWeights()
  }, [])

  const currentWeight = weight.map((data, i, arr) => {
    if (arr.length - 1 === i) {
      return (data.weight)
    }
  })

  return (
    <>
      <div id="pages-dashboard" className="row m-5">
        <div className="dashboard-left col d-flex flex-column">
          <div className="top d-flex flex-column">
            <div className="d-flex justify-content-between">
              <h2>Profile</h2>
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
                <div id="bmi-box" className="d-flex flex-column align-items-center justify-content-center">
                  <h2>{Math.floor(currentWeight[currentWeight.length - 1] / ((currentUser.height / 100) ** 2))}</h2>
                  <p>your current BMI</p>
                </div>
                <div id="weight-goal-box" className="d-flex flex-column align-items-center justify-content-center mt-3">
                  <h2>{currentWeight[currentWeight.length - 1] - currentUser.targetWeight } kg</h2>
                  <p>till your target weight</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bottom">
            <div className="d-flex justify-content-between">
              <h2>Weight Tracker</h2>
              <button
                type="button"
                onClick={openNewWeightModal}
              >
                Add Weight
              </button>

            </div>
            <div id="weights-box" />
          </div>
        </div>

        <div className="dashboard-right col">
          <div id="workouts-box">
            <div className="d-flex justify-content-between">
              <h2>Workout Routine</h2>
              <div className="workout-btn">
                <button id="add-workout-btn" type="button">Add Workout</button>
                <button type="button">Edit Workout</button>
              </div>
            </div>
            <div id="workouts">
              mon
            </div>
          </div>
        </div>
      </div>
      <ModalsProfileEdit show={editWeightModal} handleClose={closeEditProfileModal} />
      <ModalsWeightsNew show={newWeightModal} handleClose={closeNewWeightModal} />
    </>
  )
}

export default PagesProfile
