import React from 'react'
import { Link } from 'react-router-dom'
import FormsAuthSignup from '@/forms/auth/Signup'

function PagesSignup() {
  return (
    <div id="pages-signup" className="d-flex justify-content-center">
      <div id="signup-box" className="p-5">
        <h1 className="text-center">Sign Up</h1>
        <FormsAuthSignup />
      </div>
    </div>
  )
}

export default PagesSignup
