import React from 'react'
import { Link } from 'react-router-dom'

function PagesSignup() {
  return (
    <div id="pages-signup" className="container">
      <header className="text-center border-bottom">
        <h1>Signup</h1>
        <div><Link to="/">Homepage</Link></div>
      </header>
    </div>
  )
}

export default PagesSignup
