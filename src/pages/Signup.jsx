import React from 'react'

import { useAuth } from '@/contexts/Auth'
import FormsAuthSignup from '@/forms/auth/Signup'

function PagesSignup() {
  const { signup } = useAuth()

  return (
    <div id="pages-signup" className="d-flex justify-content-center">
      <div id="signup-box" className="p-5">
        <h1 className="text-center">Sign Up</h1>
        <FormsAuthSignup
          onSubmit={signup}
        />
      </div>
    </div>
  )
}

export default PagesSignup
