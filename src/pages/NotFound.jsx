import React from 'react'
import { Link } from 'react-router-dom'

function PagesNotFound() {
  return (
    <div id="pages-not-found" className="text-center mt-5">
      <h1 id="not-found">404</h1>
      <h2>Page not found</h2>
      <div className="back-homepage mt-3">
        <Link to="/">back to homepage</Link>
      </div>
    </div>
  )
}

export default PagesNotFound
