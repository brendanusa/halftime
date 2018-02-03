import React, { Component } from 'react';
import axios from 'axios';
import './Ncaa.css';
import Game from './Game.js';

class Ncaa extends Component {

  constructor(props) {
    super(props);
    this.state = {games: [], newGameIDs: '', date: ''};
    this.handleIDsChange = this.handleIDsChange.bind(this);
    this.handleIDsSubmit = this.handleIDsSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDateSubmit = this.handleDateSubmit.bind(this);
  }

  handleIDsChange(event) {
    this.setState({newGameIDs: [event.target.value]});
  }

  handleIDsSubmit(event) {
    var idsStr = this.state.newGameIDs.join()
    var idsArr = idsStr.split(',');
    let i = 0;
    const fetchGame = (gameID) => {
      var url = '/pregame?id=' + gameID
      axios.get(url)
        .then(res => this.setState({games: this.state.games.concat([res.data])}))
        .then(() => {
          console.log('GAME RETRIEVED!', this.state);
          i++
          idsArr[i] ? fetchGame(idsArr[i]) : null;
          return;
        })
    }
    fetchGame(idsArr[i]);
  }

  handleDateChange(event) {
    this.setState({date: [event.target.value]});
  }

  handleDateSubmit(event) {
    var url = '/scoreboard?date=' + this.state.date;
      axios.get(url)
        .then(res => {
          this.setState({newGameIDs: [res.data]})
        })
        .then(() => {
          console.log('GAME IDs UPDATED!', this.state);
        })
        .then(() => {
          this.handleIDsSubmit();
        })
  }

  render() {
    return (
      <div className="ncaa">
      <h1 style={{"textAlign": "left"}}>NCAA</h1>
        <div>
          {this.state.games.map(game =>
            <Game game={game} league="mens-college-basketball" />
          )}
        </div>
        <div>
          <form onSubmit={this.handleIDsSubmit}>
            Enter Game IDs:
            <input type="text" value={this.newGameIDs} onChange={this.handleIDsChange} />
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div>
          -OR-
        </div>
        <div>
          <form onSubmit={this.handleDateSubmit}>
            Enter Date (YYYYMMDD):
            <input type="text" onChange={this.handleDateChange} />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default Ncaa;