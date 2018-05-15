import React, { Component } from 'react';
import axios from 'axios';
import './Game.css'

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
      console.log(`game ${this.props.game.id} already in progress - must retrieve halftime data manually!`)
    } else if (this.props.game.tipoff !== 'final') {
      // retrieve halftime data 56 mins (in ms) after tipoff
      let halftime = new Date(this.props.game.tipoff);
      halftime = new Date(halftime.getTime() + 3360000);
      console.log(this.props.game.id, halftime)
      schedule.scheduleJob(halftime, () => {
        console.log(`GAME ${this.props.game.id} HALFTIME DATA RETRIEVED AT: `, new Date());
        this.handleClick();
      });
    }
  }

  handleClick() {
    // should switch statement be used here?
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
              clock: res.data.clock
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
        <div className="game">
          {this.props.game.id},
          {this.props.game.tipoff || 'in progress'},

          {this.props.game.road.school},
          {this.props.game.road.sos},
          {this.props.game.road.srs},
          {this.props.game.road.mov},
          {this.props.game.road.oRtg},
          {this.props.game.road.dRtg},
          {this.props.game.road.oEfg},
          {this.props.game.road.dEfg},
          {this.props.game.road.o2pt},
          {this.props.game.road.d2pt},
          {this.props.game.road.o3pt},
          {this.props.game.road.d3pt},
          {this.props.game.road.oFtFga},
          {this.props.game.road.dFtFga},
          {this.props.game.road.ft},
          {this.props.game.road.oTov},
          {this.props.game.road.dTov},
          {this.props.game.road.oReb},
          {this.props.game.road.dReb},

          {this.props.game.road.school},
          {this.props.game.road.mov},
          {this.props.game.road.oRtg},
          {this.props.game.road.dRtg},
          {this.props.game.road.oEfg},
          {this.props.game.road.dEfg},
          {this.props.game.road.o2pt},
          {this.props.game.road.d2pt},
          {this.props.game.road.o3pt},
          {this.props.game.road.d3pt},
          {this.props.game.road.oFtFga},
          {this.props.game.road.dFtFga},
          {this.props.game.road.oFt},
          {this.props.game.road.oTov},
          {this.props.game.road.dTov},
          {this.props.game.road.oReb},
          {this.props.game.road.dReb},

          {this.props.game.xMov},
          {this.props.game.rtgDiff},
          {this.props.game.efgDiff},
          {this.props.game.x2ptDiff},
          {this.props.game.x3ptDiff},
          {this.props.game.xFtFgaDiff},
          {this.props.game.xFtDiff},
          {this.props.game.xTovDiff},
          {this.props.game.xHRebDiff},
          {this.props.game.xARebDiff}

            <button onClick={this.handleClick}>{this.state.gameStateDisplay}</button>
          </div>
          <div>
          </div>
      </div>
    );
  }

}

          // {this.props.game.road.school},
          // {this.props.game.road.srs},
          // {this.props.game.road.sos || null},
          // {this.props.game.road.twos},
          // {this.props.game.road.threes},
          // {this.props.game.road.opptwos},
          // {this.props.game.road.oppthrees},
          // {this.props.game.road.rebdiff.toString().slice(0,5)},
          // {this.props.game.road.astdiff.toString().slice(0,5)},
          // {this.props.game.road.todiff.toString().slice(0,5)},

          // {this.props.game.home.school},
          // {this.props.game.home.srs},
          // {this.props.game.home.sos},
          // {this.props.game.home.twos},
          // {this.props.game.home.threes},
          // {this.props.game.home.opptwos},
          // {this.props.game.home.oppthrees},
          // {this.props.game.home.rebdiff.toString().slice(0,5)},
          // {this.props.game.home.astdiff.toString().slice(0,5)},
          // {this.props.game.home.todiff.toString().slice(0,5)},

                    // {this.props.game.road.school},
          // {this.state.half.road.pts || null},
          // {this.state.half.road.twos || null},
          // {this.state.half.road.threes || null},
          // {this.state.half.road.reb || null},
          // {this.state.half.road.ast || null},
          // {this.state.half.road.to || null},

          // {this.props.game.home.school},
          // {this.state.half.home.pts || null},
          // {this.state.half.home.twos || null},
          // {this.state.half.home.threes || null},
          // {this.state.half.home.reb || null},
          // {this.state.half.home.ast || null},
          // {this.state.half.home.to || null},

          // {this.props.game.road.school},
          // {this.state.full.road.pts || null},
          // {this.state.full.road.twos || null},
          // {this.state.full.road.threes || null},
          // {this.state.full.road.reb || null},
          // {this.state.full.road.ast || null},
          // {this.state.full.road.to || null},

          // {this.props.game.home.school},
          // {this.state.full.home.pts || null},
          // {this.state.full.home.twos || null},
          // {this.state.full.home.threes || null},
          // {this.state.full.home.reb || null},
          // {this.state.full.home.ast || null},
          // {this.state.full.home.to || null},

          // {this.state.half.clock || null}

export default Game;