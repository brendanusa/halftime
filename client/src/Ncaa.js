import React, { Component } from 'react';
import axios from 'axios';
import './Ncaa.css';
import Game from './Game.js';

class Ncaa extends Component {

  constructor(props) {
    super(props);
    this.state = {games: [], newGameIDs: '', date: '', clicked: false, updateMultipleDelay: 0};
    this.handleIDsChange = this.handleIDsChange.bind(this);
    this.handleIDsSubmit = this.handleIDsSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDateSubmit = this.handleDateSubmit.bind(this);
    this.handleClickAll = this.handleClickAll.bind(this);
    this.clearGames = this.clearGames.bind(this);
  }

  handleIDsChange(event) {
    this.setState({
      clicked: false,
      newGameIDs: [event.target.value]
    });
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
          return idsArr[i] ? fetchGame(idsArr[i]) : null;
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

  handleClickAll() {
    this.setState({
      clicked: true, 
      updateMultipleDelay: this.state.games.length * 1000
    })
  }

  clearGames() {
    this.setState({
      games: []
    })
  }

  render() {
    return (
      <div className="ncaa">
      <h1 style={{"textAlign": "left"}}>NCAA</h1>
        <div>
          {this.state.games.map(game =>
            <Game game={game} key={game.id} league="mens-college-basketball" clicked={this.state.clicked} delay={this.state.updateMultipleDelay} />
          )}
        </div>
        <div id="actions-container">
          <div className="actions" id="ids">
            <form onSubmit={this.handleIDsSubmit}>
              Enter Game IDs (separate with commas to select multiple):
              <input type="text" value={this.newGameIDs} onChange={this.handleIDsChange} />
              <input type="submit" value="Submit" />
            </form>
          </div>
          <div>
            -OR-
          </div>
          <div className="actions" id="date">
            <form onSubmit={this.handleDateSubmit}>
              Enter Date to load all games on that day (YYYYMMDD):
              <input type="text" onChange={this.handleDateChange} />
              <input type="submit" value="Submit" />
            </form>
          </div>
          <div>
            -THEN, IF YOU'RE FEELING FANCY-
          </div>
          <div className="actions">
            Click here to retrieve data for all games:
            <button type="button" onClick={this.handleClickAll}>Update All</button>
          </div>
          <div>
            <button type="button" onClick={this.clearGames}>Clear All</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Ncaa;