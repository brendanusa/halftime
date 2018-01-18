import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => (
  <div>
    <h1>HALFTIME</h1>
    <h4>A CSV data generator for basketball games for those who love looking at CSV during basketball games</h4>
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
