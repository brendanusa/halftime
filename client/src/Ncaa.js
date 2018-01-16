import React, { Component } from 'react';

class Ncaa extends Component {
  state = {games: []}

  componentDidMount() {
    fetch('/table')
      .then(res => res.json())
      .then(games => this.setState({ games }));
  }

  render() {
    return (
      <div className="Ncaa">
        {this.state.games.map(game => 
          <div key={game.id}>{game.stuff}</div>
          )}
      </div>
      // <div>
      
      // </div>
    );
  }
}

export default Ncaa;