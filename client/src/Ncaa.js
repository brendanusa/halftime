import React, { Component } from 'react';
import axios from 'axios';

class Ncaa extends Component {

  constructor(props) {
    super(props);
    this.state = {games: [], newGameId: '0'};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({newGameId: event.target.value});
  }

  handleSubmit(event) {
    var url = '/pregame?ID=' + this.state.newGameId
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
      <div>
        <div className="Ncaa">
          {this.state.games.map(game => 
            <div>{game.road.school}, {game.road.srs}, {game.road.sos}, {game.road.twos}, {game.road.threes}, {game.road.reb.toString().slice(0, 5)}, {game.road.ast.toString().slice(0, 5)}, {game.road.to.toString().slice(0, 5)}, {game.home.school}, {game.home.srs}, {game.home.sos}, {game.home.twos}, {game.home.threes}, {game.home.reb.toString().slice(0, 5)}, {game.home.ast.toString().slice(0, 5)}, {game.home.to.toString().slice(0, 5)}, </div>
            )}
        </div>

        <div>
          <form onSubmit={this.handleSubmit}>
            ENTER NEW GAME ID:
            <input type="text" onChange={this.handleChange} />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default Ncaa;