import React, { useState, createContext, useContext } from 'react'
import axios from 'axios'
import produce from 'immer'
import { toast } from 'react-toastify'

const WorkoutContext = createContext()

const initialIndex = { data: [], error: null, loading: true }

export function WorkoutProvider({ children }) {
  // States
  const [indexState, setIndexState] = useState({ data: [], error: null, loading: true })

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

  // Get exercise
  // const getExercise = async (isRefresh) => {
  //   if (!isRefresh) setIndexState(initialIndex)
  //   setIndexState(await produce(initialIndex, e, async (draft) => {
  //     const query = parseFormData(new FormData(e.currentTarget))
  //     try {
  //       const resp = await axios({
  //         method: 'GET',
  //         url: 'https://api-ninjas.com/api/exercises',
  //         params: {
  //           ...query,
  //           key: 'FfbeZRFQEmZBKY80XrsQDg==t8m7PweWY3bhHOZ1'
  //         }
  //       })
  //       draft.data = resp.data
  //     } catch (err) {
  //       draft.error = err.response.data
  //     } finally {
  //       draft.loading = false
  //     }
  //   }))
  // }

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
      // window.location.reload()
    } catch (err) {
      console.log(err) // eslint-disable-line
    }
  }

  // Update Workout
  const updateWorkout = async (data) => {
    try {
      await axios({
        method: 'PUT',
        url: 'http://localhost:3000/api/my/workout',
        data
      })
      closeEditWorkoutModal()
      toast.success('Workout updated!')
      window.location.reload()
    } catch (err) {
        console.log(err) // eslint-disable-line
    }
  }

  // Get Workouts
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

  // Data Available On Context
  const contextData = {
    index: indexState,
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
