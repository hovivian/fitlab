import React from 'react'
import { Routes, BrowserRouter, Route } from 'react-router-dom'

import App from '@/layouts/App'

import PagesHome from '@/pages/Home'
import PagesSignup from '@/pages/Signup'
import PagesDashboard from '@/pages/Dashboard'
import PagesNotFound from '@/pages/NotFound'

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<PagesHome />} />
          <Route path="/signup" element={<PagesSignup />} />
          <Route path="/dashboard" element={<PagesDashboard />} />
          <Route path="*" element={<PagesNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Routing
