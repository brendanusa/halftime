var express = require('express');
var router = express.Router();
const cheerio = require('cheerio');
const axios = require ('axios');

router.get('/', function(req, res, next) {

  var url = 'http://www.espn.com/nba/matchup?gameId=400975396';

  axios.get(url)
    .then(res => {
      let $ = cheerio.load(res.data);
      var data = '';
      const cells = $('.mod-data tbody').children('tr').children('td');
      let obj = cells[4].children[0];
      let str = obj.data.replace('\n\t\t\t\t\t\t\t\t\t\t', '').replace('\n\t\t\t\t\t\t\t\t\t', '');
      data += str + ', ';
      // data += str.split('-')[0] + ', ';
      // data += str.split('-')[1];
      console.log(data)
      return data;
    })
    .then(data => {
      console.log('SUCCESS!');
      res.json([{
        id: 1,
        stuff: data
      }, {
        id: 2,
        stuff: data
      }])
    })
    .catch(err => {
      console.log('there has been an error: ', err)
    });

  // res.json([{
  //   id: 1,
  //   stuff: 'hello'
  // }, {
  //   id: 2,
  //   stuff: 'hey'
  // }])

});

module.exports = router;
