import React, { Component } from 'react';

class Game extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
        <div>
          {this.props.game.map(game => 
            <div>
              <div>
                {game.id}, {game.road.school}, {game.road.srs}, {game.road.sos}, {game.road.twos}, {game.road.threes}, {game.road.reb.toString().slice(0, 5)}, {game.road.ast.toString().slice(0, 5)}, {game.road.to.toString().slice(0, 5)}, {game.home.school}, {game.home.srs}, {game.home.sos}, {game.home.twos}, {game.home.threes}, {game.home.reb.toString().slice(0, 5)}, {game.home.ast.toString().slice(0, 5)}, {game.home.to.toString().slice(0, 5)}, 
                  <button type="button" onClick={this.handleClick(game.id)} />
                </div>
                <div>

                </div>
              </div>
            )}
        </div>
    );
  }

}