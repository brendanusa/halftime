const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const axios = require ('axios');

// removes spaces inside game data table cells
const deleteSpace = (string) => {
  return string.replace('\n\t\t\t\t\t\t\t\t\t\t', '').replace('\n\t\t\t\t\t\t\t\t\t', '')
}

// calculates 2P% from FG% and 3P% cells
const calculateTwos = (fgs, threes) => {
  return ((parseInt(fgs.split('-')[0]) - parseInt(threes.split('-')[0])) / (twosAtt = parseInt(fgs.split('-')[1]) - parseInt(threes.split('-')[1]))).toString().slice(1, 5);
}

const populateTeamData = (team, parent) => {
  // road and home cells are adjacent
  i = (team === 'road') ? 0 : 1;
  return {
    twos: calculateTwos(deleteSpace(parent[1 + i].children[0].data), deleteSpace(parent[7 + i].children[0].data)),
    threes: '.' + deleteSpace(parent[10 + i].children[0].data).replace('.', ''),
    reb: deleteSpace(parent[19 + i].children[0].data),
    ast: deleteSpace(parent[31 + i].children[0].data),
    to: deleteSpace(parent[40 + i].children[0].data)
  }
}

router.get('/', function(req, res, next) {

  const url = `http://www.espn.com/${req.query.league}/matchup?gameId=${req.query.id}`;

  axios.get(url)
    .then(res => {
      let $ = cheerio.load(res.data);
      let parent = $('.mod-data tbody').children('tr').children('td');
      // stats
      const data = {road: populateTeamData('road', parent), home: populateTeamData('home', parent)};
      // points
      data.road.pts = $('.score.icon-font-after')[0].children[0].data;
      data.home.pts = $('.score.icon-font-before')[0].children[0].data;
      // clock
      parent = $('body #global-viewport #pane-main #custom-nav #gamepackage-header-wrap #gamepackage-matchup-wrap').children().first().find('.status-detail');
      data.clock = parent[0].children[0].data;
      return data;
    })
    .then(data => {
      console.log('IN-GAME DATA RETRIEVED!');
      res.json(data);
    })
    .catch(err => {
      console.log('there has been an error retrieving in-game data: ', err)
    });

});

module.exports = router;
