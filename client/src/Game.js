import React, { Component } from 'react';
import axios from 'axios';

class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {gameStateDisplay: 'Halftime!', half: {road: {}, home: {}}, full: {road: {}, home: {}}};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    switch(this.state.gameStateDisplay) {
      case 'It\'s over!':
        var url = `/ingame?league=${this.props.league}&id=${this.props.game.id}`;
        axios.get(url)
          .then(res => {
            this.setState(
              Object.assign({}, this.state, {
                full: {
                  road: {
                    pts: res.data.road.pts,
                    twos: res.data.road.twos,
                    threes: res.data.road.threes,
                    reb: res.data.road.reb,
                    ast: res.data.road.ast,
                    to: res.data.road.to
                  },
                  home: {
                    pts: res.data.home.pts,
                    twos: res.data.home.twos,
                    threes: res.data.home.threes,
                    reb: res.data.home.reb,
                    ast: res.data.home.ast,
                    to: res.data.home.to
                  }
                }
              })
            )
            this.setState({gameStateDisplay: 'Great job!'})
          })
        break;
      case 'Halftime!':
        var url = `/ingame?league=${this.props.league}&id=${this.props.game.id}`;
        axios.get(url)
          .then(res => this.setState({
            half: {
              road: {
                pts: res.data.road.pts,
                twos: res.data.road.twos,
                threes: res.data.road.threes,
                reb: res.data.road.reb,
                ast: res.data.road.ast,
                to: res.data.road.to
              },
              home: {
                pts: res.data.home.pts,
                twos: res.data.home.twos,
                threes: res.data.home.threes,
                reb: res.data.home.reb,
                ast: res.data.home.ast,
                to: res.data.home.to
              }
            },
            gameStateDisplay: 'It\'s over!'})
          )
        break;
      case 'Great job!':
        this.setState({gameStateDisplay: 'go away'})
        break;
    }
  }

  render() {
    return (
      <div>
        <div>
          {this.props.game.id},

          {this.props.game.road.school},
          {this.props.game.road.srs},
          {this.props.game.road.sos},
          {this.props.game.road.twos},
          {this.props.game.road.threes},
          {this.props.game.road.reb.toString().slice(0,5)},
          {this.props.game.road.ast.toString().slice(0,5)},
          {this.props.game.road.to.toString().slice(0,5)},

          {this.props.game.home.school},
          {this.props.game.home.srs},
          {this.props.game.home.sos},
          {this.props.game.home.twos},
          {this.props.game.home.threes},
          {this.props.game.home.reb.toString().slice(0,5)},
          {this.props.game.home.ast.toString().slice(0,5)},
          {this.props.game.home.to.toString().slice(0,5)},

          {this.props.game.road.school},
          {this.state.half.road.pts || null},
          {this.state.half.road.twos || null},
          {this.state.half.road.threes || null},
          {this.state.half.road.reb || null},
          {this.state.half.road.ast || null},
          {this.state.half.road.to || null},

          {this.props.game.home.school},
          {this.state.half.home.pts || null},
          {this.state.half.home.twos || null},
          {this.state.half.home.threes || null},
          {this.state.half.home.reb || null},
          {this.state.half.home.ast || null},
          {this.state.half.home.to || null},

          {this.props.game.road.school},
          {this.state.full.road.pts || null},
          {this.state.full.road.twos || null},
          {this.state.full.road.threes || null},
          {this.state.full.road.reb || null},
          {this.state.full.road.ast || null},
          {this.state.full.road.to || null},

          {this.props.game.home.school},
          {this.state.full.home.pts || null},
          {this.state.full.home.twos || null},
          {this.state.full.home.threes || null},
          {this.state.full.home.reb || null},
          {this.state.full.home.ast || null},
          {this.state.full.home.to || null},

            <button onClick={this.handleClick}>{this.state.gameStateDisplay}</button>
          </div>
          <div>
          </div>
      </div>
    );
  }

}

export default Game;