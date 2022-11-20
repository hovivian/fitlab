import React, { useState, createContext, useContext, useEffect } from 'react'
import axios from 'axios'
import produce from 'immer'
import { toast } from 'react-toastify'

const ProfileContext = createContext()

export function ProfileProvider({ children }) {
  // States

  // New Weight Modal
  const [newWeightModal, setNewWeightModal] = useState(false)
  const openNewWeightModal = () => setNewWeightModal(true)
  const closeNewWeightModal = () => setNewWeightModal(false)

  // // Edit Profile Modal
  // const [editModal, setEditModal] = useState(false)
  // const openEditModal = (profileId) => {
  //   setShowId(profileId)
  //   setEditModal(true)
  // }
  // const closeEditModal = () => {
  //   setShowId(null)
  //   setEditModal(false)
  // }

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
    } catch (err) {
      console.log(err) // eslint-disable-line
    }
  }

  // // Update Profile
  // const updateProfile = async (data) => {
  //   try {
  //     const resp = await axios({
  //       method: 'PUT',
  //       url: `http://localhost:3000/api/my/profile/${data.id}`,
  //       data
  //     })
  //     closeEditModal()
  //     openShowModal(resp.data.todo.id)
  //     setIndexState(produce(indexState, (draft) => {
  //       const index = draft.data.findIndex((profile) => profile.id === resp.data.user.id)
  //       if (index !== -1) draft.data[index] = resp.data.user
  //     }))
  //   } catch (err) {
  //     console.log(err) // eslint-disable-line
  //   }
  // }

  // Data Available On Context
  const contextData = {
    apis: {
      createWeight
    },
    modals: {
      newWeightModal,
      openNewWeightModal,
      closeNewWeightModal
    }
  }

  return <ProfileContext.Provider value={contextData}>{children}</ProfileContext.Provider>
}

export function useProfile() {
  return useContext(ProfileContext)
}
