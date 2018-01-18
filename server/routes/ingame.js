var express = require('express');
var router = express.Router();
const cheerio = require('cheerio');
const axios = require ('axios');

// OLD NBA/HALFTIME CODE
// console.log('AST?', cells[28].children[0].data)
// road.ast = deleteSpace(cells[28].children[0].data);
// console.log('to?', cells[37].children[0].data)
// road.to = deleteSpace(cells[37].children[0].data);

const deleteSpace = (string) => {
  return string.replace('\n\t\t\t\t\t\t\t\t\t\t', '').replace('\n\t\t\t\t\t\t\t\t\t', '')
}

const calculateTwos = (fgs, threes) => {
  const twosMade = parseInt(fgs.split('-')[0]) - parseInt(threes.split('-')[0]);
  const twosAtt = parseInt(fgs.split('-')[1]) - parseInt(threes.split('-')[1]);
  var ratio = twosMade/twosAtt;
  return ratio.toString().slice(1, 5);
}

router.get('/', function(req, res, next) {

  var url = `http://www.espn.com/${req.query.league}/matchup?gameId=${req.query.id}`;

  axios.get(url)
    .then(res => {
      let $ = cheerio.load(res.data);
      var road = {};
      var home = {};
      const cells = $('.mod-data tbody').children('tr').children('td');
      road.pts = $('.score.icon-font-after')[0].children[0].data;
      road.twos = calculateTwos(deleteSpace(cells[1].children[0].data), deleteSpace(cells[7].children[0].data));
      let rawThrees = deleteSpace(cells[10].children[0].data)
      road.threes = '.' + rawThrees.replace('.', '')
      road.reb = deleteSpace(cells[19].children[0].data);
      road.ast = deleteSpace(cells[31].children[0].data);
      road.to = deleteSpace(cells[40].children[0].data);
      home.pts = $('.score.icon-font-before')[0].children[0].data;
      home.twos = calculateTwos(deleteSpace(cells[2].children[0].data), deleteSpace(cells[8].children[0].data));
      rawThrees = deleteSpace(cells[11].children[0].data)
      home.threes = '.' + rawThrees.replace('.', '')
      home.reb = deleteSpace(cells[20].children[0].data);
      home.ast = deleteSpace(cells[32].children[0].data);
      home.to = deleteSpace(cells[41].children[0].data);
      var data = {road: road, home: home}
      return data;
    })
    .then(data => {
      console.log('SUCCESS!');
      res.json(data);
    })
    .catch(err => {
      console.log('there has been an error: ', err)
    });

});

module.exports = router;
