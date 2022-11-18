import React, { useState, createContext, useContext, useEffect } from 'react'
import axios from 'axios'
import produce from 'immer'

const ProfileContext = createContext()

const initialIndex = { data: [], error: null, loading: true }
const initialShow = { data: null, error: null, loading: true }

export function ProfileProvider({ children }) {
  // Index State
  const [indexState, setIndexState] = useState({ data: [], error: null, loading: true })

  // Show State
  const [showState, setShowState] = useState({ data: null, error: null, loading: true })

  // Current Selected Todo Id
  const [showId, setShowId] = useState(null)

  // New Modal
  const [newModal, setNewModal] = useState(false)
  const openNewModal = () => setNewModal(true)
  const closeNewModal = () => setNewModal(false)

  // Edit Modal
  const [editModal, setEditModal] = useState(false)
  const openEditModal = (todoId) => {
    setShowId(todoId)
    setEditModal(true)
  }
  const closeEditModal = () => {
    setShowId(null)
    setEditModal(false)
  }

  // Show Modal
  const [showModal, setShowModal] = useState(false)
  const openShowModal = (userId) => {
    setShowId(userId)
    setShowModal(true)
  }
  const closeShowModal = () => {
    setShowId(null)
    setShowModal(false)
  }

  // Create Weight
  const createWeight = async (data) => {
    try {
      const resp = await axios({
        method: 'POST',
        url: 'http://localhost:3000/api/my/weight',
        data
      })
      closeNewModal()
      openShowModal(resp.data.weight.id)
    } catch (err) {
      console.log(err) // eslint-disable-line
    }
  }

  // Update Profile
  const updateProfile = async (data) => {
    try {
      const resp = await axios({
        method: 'PUT',
        url: `http://localhost:3000/api/my/profile/${data.id}`,
        data
      })
      closeEditModal()
      openShowModal(resp.data.todo.id)
      setIndexState(produce(indexState, (draft) => {
        const index = draft.data.findIndex((profile) => profile.id === resp.data.user.id)
        if (index !== -1) draft.data[index] = resp.data.user
      }))
    } catch (err) {
      console.log(err) // eslint-disable-line
    }
  }

  // Data Available On Context
  const contextData = {
    index: indexState,
    show: showState,
    showId,
    apis: {
      getProfile,
      updateProfile,
      createWeight
    },
    modals: {
      newModal,
      openNewModal,
      closeNewModal,
      editModal,
      openEditModal,
      closeEditModal,
      showModal,
      openShowModal,
      closeShowModal
    }
  }

  return <ProfileContext.Provider value={contextData}>{children}</ProfileContext.Provider>
}

export function useProfile() {
  return useContext(ProfileContext)
}
