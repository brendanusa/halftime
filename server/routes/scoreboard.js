var express = require('express');
var router = express.Router();
const cheerio = require('cheerio');
const axios = require ('axios');

let url = 'http://www.espn.com/mens-college-basketball/scoreboard/_/group/50/date/';

router.get('/', (req, res, next) => {
  url += req.query.date;
  console.log('URL', url)
  axios.get(url)
    .then(res => {
      let $ = cheerio.load(res.data);
      //game IDs (and all scoreboard data) live inside massive, unpleasant script tag
      const links = $('head').children('script').last()
      const scoreboardDataString = links[0].children[0].data.replace('window.espn.scoreboardData \t= ', '');
      const scoreboardDataEvents = JSON.parse(scoreboardDataString.slice(0, scoreboardDataString.indexOf(';window.espn.scoreboardSettings'))).events;
      let gameIDs = '';
      scoreboardDataEvents.forEach(game => {
        gameIDs += game.id + ','
      })
      return gameIDs = gameIDs.slice(0, gameIDs.length - 1);
    })
    .then(gameIDs => {
      res.json(gameIDs);
    })
    .catch(err => {
      console.log('there has been an error')
    });
})

module.exports = router;