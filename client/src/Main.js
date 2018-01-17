import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Nba from './Nba';
import Ncaa from './Ncaa';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/nba' component={Nba}/>
      <Route path='/ncaa' component={Ncaa}/>
    </Switch>
  </main>
)

export default Main;
