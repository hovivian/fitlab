import React from 'react'
import { Routes, BrowserRouter, Route } from 'react-router-dom'

import { AuthProvider } from '@/contexts/Auth'

import App from '@/layouts/App'
import AuthRoute from '@/layouts/AuthRoute'
import NoAuthRoute from '@/layouts/NoAuthRoute'

import PagesHome from '@/pages/Home'
import PagesSignup from '@/pages/Signup'
import PagesProfile from '@/pages/Profile'
import PagesNotFound from '@/pages/NotFound'

function Routing() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<NoAuthRoute><PagesHome /></NoAuthRoute>} />
            <Route path="/signup" element={<NoAuthRoute><PagesSignup /></NoAuthRoute>} />
            <Route path="/my/profile" element={<PagesProfile />} />
            <Route path="*" element={<PagesNotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default Routing
