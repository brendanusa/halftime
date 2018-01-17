import React, { Component } from 'react';

class Ncaa extends Component {
  state = {games: []}

  componentDidMount() {
    fetch('/pregame')
      .then(res => res.json())
      // .then(data => console.log(data))
      .then(data => this.setState({games: this.state.games.concat([data])}))
      .then(() => console.log('STATE', this.state))
  }

  render() {
    return (
      <div className="Ncaa">
        {this.state.games.map(game => 
          <div>{game.road.school}</div>
          )}
      </div>
    );
  }
}

export default Ncaa;