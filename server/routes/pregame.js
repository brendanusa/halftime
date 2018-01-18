var express = require('express');
var router = express.Router();
const cheerio = require('cheerio');
const axios = require ('axios');

const buildTeamObj = (team, data) => {
  data[team].srs = parent[5].children[1].data.split('(')[0].replace(' ', '').slice(0, -1);
  data[team].sos = parent[6].children[1].data.split('(')[0].replace(' ', '').slice(0, -1);
  parent = $('#team_stats tbody').children().first();
  const games = parseInt(parent[0].children[1].children[0].data);
  data[team].twos = parent[0].children[8].children[0].data;
  data[team].threes = parent[0].children[11].children[0].data;
  data[team].reb = parseInt(parent[0].children[17].children[0].data)/games;
  data[team].ast = parseInt(parent[0].children[18].children[0].data)/games;
  data[team].to = parseInt(parent[0].children[21].children[0].data)/games;
  return data;
}

router.get('/', function(req, res, next) {

  let url = 'http://www.espn.com/mens-college-basketball/matchup?gameId=' + req.query.id;

  axios.get(url)
    .then(res => {
      let $ = cheerio.load(res.data);
      let parent = ($('head title'));
      var road = {school: parent[0].children[0].data.split(' vs. ')[0].replace(' ', '-').toLowerCase()};
      var home = {school: parent[0].children[0].data.split(' vs. ')[1].split(' - ')[0].replace(' ', '-').toLowerCase()};
      var data = {id: req.query.id, road: road, home: home};
      return data;
    })
    // ROAD
    .then(data => {
      url = `https://www.sports-reference.com/cbb/schools/${data.road.school}/2018.html`;
      return axios.get(url)
        .then(res => {
          $ = cheerio.load(res.data);
          parent = $('#meta').children().first().next().children('p');
          buildTeamObj('road', data);
          return data;
        })
    })
    .then(data => {
      url = `https://www.sports-reference.com/cbb/schools/${data.home.school}/2018.html`;
      return axios.get(url)
        .then(res => {
          $ = cheerio.load(res.data);
          parent = $('#meta').children().first().next().children('p');
          buildTeamObj('home', data);
          return data;
        })
    })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log('there has been an error: ', err)
    });



})

module.exports = router;
