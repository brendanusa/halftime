import React, { Component } from 'react';
import axios from 'axios';
import './Ncaa.css';
import Game from './Game.js';

class Ncaa extends Component {

  constructor(props) {
    super(props);
    this.state = {games: [], newGameIds: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({newGameIds: [event.target.value]});
  }

  handleSubmit(event) {
    console.log('21', this.state.newGameIds)
    var tempStr = this.state.newGameIds.join()
    console.log('23', tempStr)
    var tempArr = tempStr.split(',');
    console.log('25', tempArr)
    // tempArr.forEach(gameId => {
    //   console.log('23', gameId)
    //   var url = '/pregame?id=' + gameId
    //   axios.get(url)
    //     .then(res => this.setState({games: this.state.games.concat([res.data])}))
    //     .then(() => console.log('GAME RETRIEVED!', this.state))
    // })
    let i = 0;
    const fetchGame = (gameId) => {
      var url = '/pregame?id=' + gameId
      axios.get(url)
        .then(res => this.setState({games: this.state.games.concat([res.data])}))
        .then(() => {
          console.log('GAME RETRIEVED!', this.state);
          i++
          tempArr[i] ? fetchGame(tempArr[i]) : null;
          return;
        })
    }
    fetchGame(tempArr[i]);

  }

  render() {
    return (
      <div className="ncaa">
      <h1 style={{"text-align": "left"}}>NCAA</h1>
        <div>
          {this.state.games.map(game =>
            <Game game={game} league="mens-college-basketball" />
          )}
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            Enter Game IDs:
            <input type="text" onChange={this.handleChange} />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default Ncaa;