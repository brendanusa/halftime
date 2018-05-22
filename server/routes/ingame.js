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
  const fgMade = parseInt(deleteSpace(parent[1 + i].children[0].data).split('-')[0]);
  const fgAtt = parseInt(deleteSpace(parent[1 + i].children[0].data).split('-')[1])
  const threesMade = parseInt(deleteSpace(parent[7 + i].children[0].data).split('-')[0]);
  const threesAtt = parseInt(deleteSpace(parent[7 + i].children[0].data).split('-')[1]);
  const twosMade = fgMade - threesMade;
  const twosAtt = fgAtt - threesAtt;
  const ftMade = parseInt(deleteSpace(parent[13 + i].children[0].data).split('-')[0]);
  const ftAtt = parseInt(deleteSpace(parent[13 + i].children[0].data).split('-')[1]);
  const oReb = deleteSpace(parent[22 + i].children[0].data);
  const dReb = deleteSpace(parent[25 + i].children[0].data);
  const ast = deleteSpace(parent[28 + i].children[0].data);
  const tov = deleteSpace(parent[37 + i].children[0].data);
  // const twos = parseFloat(calculateTwos(deleteSpace(parent[1 + i].children[0].data), deleteSpace(parent[7 + i].children[0].data)));
  // const threes = parseFloat('.' + deleteSpace(parent[10 + i].children[0].data).replace('.', ''));

  return {
    fgMade: fgMade,
    fgAtt: fgAtt,
    threesMade: threesMade,
    threesAtt: threesAtt,
    twosMade: twosMade,
    twosAtt: twosAtt,
    ftMade: ftMade,
    ftAtt: ftAtt,
    oReb: oReb,
    dReb: dReb,
    ast: ast,
    tov: tov,
    '2pt': twosMade / twosAtt,
    '3pt': threesMade / threesAtt,
    ft: ftMade / ftAtt,
    efg: (twosMade + 1.5 * threesMade) / fgAtt,
    ftFga: ftMade / fgAtt
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
      console.log('INGAME DATA', data)

      data.act2ptDiff = data.home['2pt'] - data.road['2pt'];
      data.act3ptDiff = data.home['3pt'] - data.road['3pt'];
      data.actEfgDiff = data.home.efg - data.road.efg;
      data.actFtFgaDiff = data.home.ftFga - data.road.ftFga;
      data.actFtDiff = data.home.ft - data.road.ft;
      data.actTovDiff = data.hom.tov - data.road.tov;
      data.actAstDiff = data.home.ast - data.road.ast;
      data.actHDReb = data.home.dReb - data.road.oReb;
      data.actRDReb = data.road.dReb - data.home.oReb;

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
