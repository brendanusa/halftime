import React, { Component } from 'react';

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
          <div key={game.id}>{game.stuff}</div>
          )}
      </div>
      // <div>
      
      // </div>
    );
  }
}

export default Nba;