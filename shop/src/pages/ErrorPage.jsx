import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <div>ErrorPage
        go to home
        <Link to='./home'  >Home</Link>
    </div>
  )
}

export default ErrorPage