import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => (
  <div>
    <h1>1/2TIME</h1>
    <div>
      <span>
        <Link class='lynx' to='/nba' style={{width:"320px;"}}>
          <img src={require('./assets/napier-nba.jpg')} alt='nba' style={{width:"320px;"}} />
        </Link>
      </span>
      <span>
        <Link class='lynx' to='/ncaa' style={{width:"345px;"}}>
          <img src={require('./assets/napier-ncaa.jpg')} alt='ncaa' style={{width:"345px;"}} />
        </Link>
      </span>
    </div>
  </div>
)

export default Home;
