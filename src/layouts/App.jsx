import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { useAuth } from '@/contexts/Auth'

import Loading from '@/components/Loading'

function App() {
  const { show: { loading }, getMyProfile } = useAuth()

  useEffect(() => {
    getMyProfile()
  }, [])

  return (
    <>
      { loading ? <Loading /> : <Outlet />}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App
