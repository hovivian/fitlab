import React, { useState, createContext, useContext, useEffect } from 'react'
import axios from 'axios'
import produce from 'immer'
import { toast } from 'react-toastify'

const WorkoutContext = createContext()

const initialIndex = { data: [], error: null, loading: true }
const initialShow = { data: null, error: null, loading: true }

export function WorkoutProvider({ children }) {
  // States
  const [indexState, setIndexState] = useState({ data: [], error: null, loading: true })
  const [showState, setShowState] = useState(initialShow)

  // Current Selected Workout Id
  const [workoutId, setWorkoutId] = useState(null)

  // New Workout Modal
  const [newWorkoutModal, setNewWorkoutModal] = useState(false)
  const openNewWorkoutModal = () => setNewWorkoutModal(true)
  const closeNewWorkoutModal = () => setNewWorkoutModal(false)

  // Edit Workout Modal
  const [editWorkoutModal, setEditWorkoutModal] = useState(false)
  const openEditWorkoutModal = (workoutId) => {
    setWorkoutId(workoutId)
    setEditWorkoutModal(true)
  }
  const closeEditWorkoutModal = () => {
    setWorkoutId(null)
    setEditWorkoutModal(false)
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

  // Update Workout
  const updateWorkout = async (data) => {
    try {
      await axios({
        method: 'PUT',
        url: 'http://localhost:3000/api/my/workout/${workoutId}',
        data
      })
      closeEditWorkoutModal()
      toast.success('Workout updated!')
      window.location.reload()
    } catch (err) {
        console.log(err) // eslint-disable-line
    }
  }

  // Get Workout
  const getWorkout = async (isRefresh) => {
    if (!isRefresh) setIndexState(initialIndex)
    setIndexState(await produce(initialIndex, async (draft) => {
      try {
        const resp = await axios({
          method: 'GET',
          url: 'http://localhost:3000/api/my/workout'
        })
        draft.data = resp.data
      } catch (err) {
        draft.error = err.response.data
      } finally {
        draft.loading = false
      }
    }))
  }

  // Get workout on showId change
  useEffect(() => {
    if (workoutId) {
      getWorkout(workoutId)
    }
  }, [workoutId])

  // Data Available On Context
  const contextData = {
    index: indexState,
    show: showState,
    apis: {
      createWorkout,
      getWorkout,
      updateWorkout
    },
    modals: {
      openNewWorkoutModal,
      closeNewWorkoutModal,
      newWorkoutModal,
      editWorkoutModal,
      openEditWorkoutModal,
      closeEditWorkoutModal
    }
  }

  return <WorkoutContext.Provider value={contextData}>{children}</WorkoutContext.Provider>
}

export function useWorkout() {
  return useContext(WorkoutContext)
}
