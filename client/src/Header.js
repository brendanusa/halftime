import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <nav>
      <span>
        <Link to='/'>Home</Link>
      </span>
      <span style={{margin:"0px 0px 0px 40px"}}>
        <Link to='/nba'>NBA</Link>
      </span>
      <span style={{margin:"0px 0px 0px 40px"}}>
        <Link to='/ncaa'>NCAA</Link>
      </span>
    </nav>
  </header>
)

export default Header
