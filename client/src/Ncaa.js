import React, { Component } from 'react';
import axios from 'axios';
import './Ncaa.css';
import Game from './Game.js';

class Ncaa extends Component {

  constructor(props) {
    super(props);
    this.state = {games: [], newGameId: '0'};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({newGameId: event.target.value});
  }

  handleClick() {
    this.setState({newGameId: event.target.value})
  }

  handleSubmit(event) {
    var url = '/pregame?id=' + this.state.newGameId
    axios.get(url)
      .then(res => this.setState({games: this.state.games.concat([res.data])}))
      .then(() => console.log('GAME RETRIEVED!', this.state))

  }

  componentDidMount() {
    // fetch('/pregame')
    //   .then(res => res.json())
    //   // .then(data => console.log(data))
    //   .then(data => this.setState({games: this.state.games.concat([data])}))
    //   .then(() => console.log('STATE', this.state))
  }

  render() {
    return (
      <div className="ncaa">
        <div>
          {this.state.games.map(game =>
            <Game game
          )}
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            Enter Game ID:
            <input type="text" onChange={this.handleChange} />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default Ncaa;