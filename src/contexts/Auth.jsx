import React, { useState, createContext, useContext } from 'react'
import axios from 'axios'
import produce from 'immer'
import { useNavigate } from 'react-router-dom'

import { renderErrors } from '@/contexts/_ultils'

const AuthContext = createContext()

const initialShow = { data: null, error: null, loading: true, authenticating: false, unAuthenticating: false }

export function AuthProvider({ children }) {
  const navigation = useNavigate()
  const [showState, setShowState] = useState(initialShow)

  const getMyProfile = async (updateInBackground) => {
    if (!updateInBackground) setShowState(initialShow)
    setShowState(await produce(updateInBackground ? showState : initialShow, async (draft) => {
      try {
        const resp = await axios({
          method: 'GET',
          url: 'http://localhost:3000/api/my/profile',
          withCredentials: true
        })
        draft.data = resp.data.user
      } catch (err) {
        draft.error = err.response.data
      } finally {
        draft.loading = false
      }
    }))
  }

  const signup = async (data) => {
    setShowState(produce(initialShow, (draft) => {
      draft.authenticating = true
      draft.loading = false
    }))
    setShowState(await produce(showState, async (draft) => {
      try {
        const resp = await axios({
          method: 'POST',
          url: 'http://localhost:3000/api/auth/signup',
          data
        })
        draft.data = resp.data.user
        navigation('/my/profile')
      } catch (err) {
        renderErrors(err)
      }
    }))
  }

  const login = async (data) => {
    setShowState(produce(initialShow, (draft) => {
      draft.authenticating = true
      draft.loading = false
    }))
    setShowState(await produce(showState, async (draft) => {
      try {
        const resp = await axios({
          method: 'POST',
          url: 'http://localhost:3000/api/auth/login',
          data,
          withCredentials: true
        })
        draft.data = resp.data.user
        navigation('/my/profile')
      } catch (err) {
        renderErrors(err)
      }
    }))
  }

  const logout = async () => {
    setShowState(produce(initialShow, (draft) => {
      draft.unAuthenticating = true
      draft.loading = false
    }))
    setShowState(await produce(showState, async (draft) => {
      try {
        await axios({
          method: 'DELETE',
          url: 'http://localhost:3000/api/auth/logout'
        })
        draft.data = null
        navigation('/')
      } catch (err) {
        renderErrors(err)
      }
    }))
  }

  const contextData = {
    show: showState,
    getMyProfile,
    signup,
    login,
    logout
  }

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
