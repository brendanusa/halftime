var express = require('express');
var router = express.Router();
const cheerio = require('cheerio');
const axios = require ('axios');

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

  var url = 'http://www.espn.com/nba/matchup?gameId=' + req.query.ID;

  axios.get(url)
    .then(res => {
      let $ = cheerio.load(res.data);
      var tm1 = {};
      var tm2 = {};
      const cells = $('.mod-data tbody').children('tr').children('td');
      // let obj = cells[4].children[0];
      // let str = obj.data.replace('\n\t\t\t\t\t\t\t\t\t\t', '').replace('\n\t\t\t\t\t\t\t\t\t', '');
      // data += str + ', ';
      tm1.pts = $('.score.icon-font-after')[0].children[0].data;
      tm1.twos = calculateTwos(deleteSpace(cells[1].children[0].data), deleteSpace(cells[7].children[0].data));
      var tempThrees = deleteSpace(cells[10].children[0].data)
      tm1.threes = '.' + tempThrees.replace('.', '')
      tm1.reb = deleteSpace(cells[19].children[0].data);
      tm1.ast = deleteSpace(cells[28].children[0].data);
      tm1.to = deleteSpace(cells[37].children[0].data);
      // console.log('PTS', tm1.pts[0].children[0].data)
      return tm1;
    })
    .then(tm1 => {
      console.log('SUCCESS!');
      res.json([{
        id: 1,
        stuff: tm1.pts
      }, {
        id: 2,
        stuff: tm1.twos
      }, {
        id: 3,
        stuff: tm1.threes
      }, {
        id: 4,
        stuff: tm1.reb
      }, {
        id: 5,
        stuff: tm1.ast        
      }, {
        id: 6,
        stuff: tm1.to        
      }])
    })
    .catch(err => {
      console.log('there has been an error: ', err)
    });

});

module.exports = router;
