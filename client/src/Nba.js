import React, { Component } from 'react';

var string = '';

class Nba extends Component {
  state = {games: []}

  componentDidMount() {
    fetch('/table')
      .then(res => res.json())
      .then(games => this.setState({ games }));
  }

  render() {
    return (
      <div className="Nba">
        {this.state.games.map(game => 
          <span key={game.id}>{game.stuff}, </span>
          )}
      </div>
      // <div>
      
      // </div>
    );
  }
}

export default Nba;