import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => (
  <div>
    <h1>HALFTIME</h1>
    <h4>A CSV data generator for lovers of basketball and commas</h4>
    <div>
      <span>
        <Link className="lynx" to="/nba" style={{width:"320px"}}>
          <img src={require('./assets/napier-nba.jpg')} alt="nba" style={{width:"320px"}} />
        </Link>
      </span>
      <span>
        <Link className="lynx" to="/ncaa" style={{width:"345px"}}>
          <img src={require('./assets/napier-ncaa.jpg')} alt="ncaa" style={{width:"345px"}} />
        </Link>
      </span>
    </div>
  </div>
)

export default Home;
