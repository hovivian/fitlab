import React from 'react'
import { Link } from 'react-router-dom'

function PagesDashboard() {
  return (
    <div id="pages-dsahboard" className="container">
      <header className="text-center border-bottom">
        <h1>Dashboard</h1>
        <div><Link to="/">Homepage</Link></div>
      </header>
    </div>
  )
}

export default PagesDashboard
