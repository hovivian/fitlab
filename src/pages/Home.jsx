import React from 'react'
import { Link } from 'react-router-dom'
import FormsAuthLogin from '@/forms/auth/Login'

function PagesHome() {
  return (
    <div id="pages-home" className="row">
      <div id="login-img-section" className="col" />
      <div id="login-form-section" className="col d-flex flex-column justify-content-around p-5 pt-2">
        <div className="">
          <div className="welcome-msg mb-5">
            <h1 className="text-center"><span>WELCOME</span></h1>
            <h2 className="text-center"><span>Login your account</span></h2>
          </div>
          <FormsAuthLogin />
          <div className="mt-5">
            <p className="text-center mb-0">Don't have an account yet?</p>
            <div className="d-flex justify-content-around create-acc">
              <Link to="/signup">create an account</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PagesHome
