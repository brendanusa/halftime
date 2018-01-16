import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
  <header>
    <nav>
      <div>
        <Link to='/'>Home</Link>
      </div>
      <div>
        <Link to='/nba'>NBA</Link>
      </div>
      <div>
        <Link to='/ncaa'>NCAA</Link>
      </div>
    </nav>
  </header>
)

export default Header
