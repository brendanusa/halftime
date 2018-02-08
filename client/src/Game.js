import React, { Component } from 'react';
import axios from 'axios';

const schedule = require('node-schedule');

class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {gameStateDisplay: 'Halftime!', half: {road: {}, home: {}}, full: {road: {}, home: {}}};
    this.handleClick = this.handleClick.bind(this);
    this.task = this.task.bind(this);
  }

  task() {
    if (this.props.game.tipoff === 'in progress') {
      console.log('game already in progress - must retrieve halftime data manually!')
    } else if (this.props.game.tipoff !== 'final') {
      // retrieve halftime data 56 mins (in ms) after tipoff
      let halftime = new Date(this.props.game.tipoff);
      halftime = new Date(halftime.getTime() + 3360000);
      schedule.scheduleJob(halftime, () => {
        console.log(`GAME ID ${this.props.game.id} HALFTIME DATA RETRIEVED AT: `, new Date());
        this.handleClick();
      });
    }
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
        url = `/ingame?league=${this.props.league}&id=${this.props.game.id}`;
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
              },
              confirm: res.data.confirm
            },
            gameStateDisplay: 'It\'s over!'})
          )
        break;
      case 'Great job!':
        this.setState({gameStateDisplay: 'go away'})
        break;
    }
  }

  componentDidMount() {
    this.task();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.clicked) {
      const delayedClick = () => {
        setTimeout(this.handleClick, Math.random() * nextProps.delay);
      }
      delayedClick();
    }
  }

  render() {
    return (
      <div>
        <div>
          {this.props.game.id},
          {this.props.game.tipoff || 'in progress'},

          {this.props.game.road.school},
          {this.props.game.road.srs},
          {this.props.game.road.sos},
          {this.props.game.road.twos},
          {this.props.game.road.threes},
          {this.props.game.road.opptwos},
          {this.props.game.road.oppthrees},
          {this.props.game.road.rebdiff.toString().slice(0,5)},
          {this.props.game.road.astdiff.toString().slice(0,5)},
          {this.props.game.road.todiff.toString().slice(0,5)},

          {this.props.game.home.school},
          {this.props.game.home.srs},
          {this.props.game.home.sos},
          {this.props.game.home.twos},
          {this.props.game.home.threes},
          {this.props.game.home.opptwos},
          {this.props.game.home.oppthrees},
          {this.props.game.home.rebdiff.toString().slice(0,5)},
          {this.props.game.home.astdiff.toString().slice(0,5)},
          {this.props.game.home.todiff.toString().slice(0,5)},

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

          {this.state.half.confirm || null},

            <button onClick={this.handleClick}>{this.state.gameStateDisplay}</button>
          </div>
          <div>
          </div>
      </div>
    );
  }

}

export default Game;