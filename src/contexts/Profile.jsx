import React, { useState, createContext, useContext, useEffect } from 'react'
import axios from 'axios'
import produce from 'immer'
import { toast } from 'react-toastify'

const ProfileContext = createContext()

const initialIndex = { data: [], error: null, loading: true }
const initialShow = { data: null, error: null, loading: true, authenticating: false, unAuthenticating: false }

export function ProfileProvider({ children }) {
  // States
  const [indexState, setIndexState] = useState({ data: [], error: null, loading: true })
  const [showState, setShowState] = useState(initialShow)

  // Current Selected Profile Id
  const [userId, setUserId] = useState(null)

  // New Weight Modal
  const [newWeightModal, setNewWeightModal] = useState(false)
  const openNewWeightModal = () => setNewWeightModal(true)
  const closeNewWeightModal = () => setNewWeightModal(false)

  // New Workout Modal
  const [newWorkoutModal, setNewWorkoutModal] = useState(false)
  const openNewWorkoutModal = () => setNewWorkoutModal(true)
  const closeNewWorkoutModal = () => setNewWorkoutModal(false)

  // Edit Profile Modal
  const [editProfileModal, setEditProfileModal] = useState(false)
  const openEditProfileModal = (userId) => {
    setUserId(userId)
    setEditProfileModal(true)
  }
  const closeEditProfileModal = () => {
    setUserId(null)
    setEditProfileModal(false)
  }

  // Show Profile Modal
  const [showProfileModal, setShowProfileModal] = useState(false)
  const openShowProfileModal = (userId) => {
    setUserId(userId)
    setShowProfileModal(true)
  }
  const closeShowProfileModal = () => {
    setUserId(null)
    setShowProfileModal(false)
  }

  // Get Profile
  const getMyProfile = async (updateInBackground) => {
    if (!updateInBackground) setShowState(initialShow)
    setShowState(await produce(updateInBackground ? showState : initialShow, async (draft) => {
      try {
        const resp = await axios({
          method: 'GET',
          url: 'http://localhost:3000/api/my/profile',
          withCredentials: true
        })
        draft.data = resp.data
      } catch (err) {
        draft.error = err.response.data
      } finally {
        draft.loading = false
      }
    }))
  }

  // Get Weight
  const getMyWeights = async (isRefresh) => {
    if (!isRefresh) setIndexState(initialIndex)
    setIndexState(await produce(initialIndex, async (draft) => {
      try {
        const resp = await axios({
          method: 'GET',
          url: 'http://localhost:3000/api/my/weight'
        })
        draft.data = resp.data
      } catch (err) {
        draft.error = err.response.data
      } finally {
        draft.loading = false
      }
    }))
  }

  // Create Weight
  const createWeight = async (data) => {
    try {
      await axios({
        method: 'POST',
        url: 'http://localhost:3000/api/my/weight',
        data
      })
      closeNewWeightModal()
      toast.success('Weight added!')
      window.location.reload()
    } catch (err) {
      console.log(err) // eslint-disable-line
    }
  }

  // Create Workout
  const createWorkout = async (data) => {
    try {
      await axios({
        method: 'POST',
        url: 'http://localhost:3000/api/my/workout',
        data
      })
      closeNewWorkoutModal()
      toast.success('Workout added!')
      window.location.reload()
    } catch (err) {
        console.log(err) // eslint-disable-line
    }
  }

  // Update Profile
  const updateProfile = async (data) => {
    try {
      await axios({
        method: 'PUT',
        url: 'http://localhost:3000/api/my/profile',
        data
      })
      closeEditProfileModal()
      toast.success('Profile updated!')
      window.location.reload()
    } catch (err) {
      console.log(err) // eslint-disable-line
    }
  }

  // Get profile on showId change
  useEffect(() => {
    if (userId) {
      getMyProfile(userId)
    }
  }, [userId])

  // Data Available On Context
  const contextData = {
    index: indexState,
    show: showState,
    userId,
    apis: {
      createWeight,
      updateProfile,
      getMyProfile,
      getMyWeights,
      createWorkout
    },
    modals: {
      newWeightModal,
      openNewWeightModal,
      closeNewWeightModal,
      editProfileModal,
      openEditProfileModal,
      closeEditProfileModal,
      showProfileModal,
      openShowProfileModal,
      closeShowProfileModal,
      newWorkoutModal,
      openNewWorkoutModal,
      closeNewWorkoutModal
    }
  }

  return <ProfileContext.Provider value={contextData}>{children}</ProfileContext.Provider>
}

export function useProfile() {
  return useContext(ProfileContext)
}
