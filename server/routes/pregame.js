const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const axios = require ('axios');

// map espn school names to ncaa bbref names
const schoolNameMap = {
  'tenn-martin': 'tennessee-martin',
  'siu-edwardsville': 'southern-illinois-edwardsville',
  'csu-bakersfield': 'cal-state-bakersfield',
  'ole-miss': 'mississippi',
  'miami-(oh)': 'miami-oh',
  'liu-brooklyn': 'long-island-university',
  'central-connecticut': 'central-connecticut-state',
  'tcu': 'texas-christian',
  'texas-a&m': 'texas-am',
  'unc-greensboro': 'north-carolina-greensboro',
  'southern-miss': 'southern-mississippi',
  'unlv': 'nevada-las-vegas',
  'smu': 'southern-methodist',
  'ucf': 'central-florida',
  'little-rock': 'arkansas-little-rock',
  'csu-northridge': 'cal-state-northridge',
  'florida-intl': 'florida-international',
  'uab': 'alabama-birmingham',
  'william-& mary': 'william-mary',
  'unc-wilmington': 'north-carolina-wilmington',
  'san-diego state': 'san-diego-state',
  'usc': 'southern-california',
  'utep': 'texas-el-paso',
  'ut-san antonio': 'texas-san-antonio',
  'byu': 'brigham-young',
  'saint-mary\'s': 'saint-marys-ca',
  'cs-fullerton': 'cal-state-fullerton',
  'long-beach state': 'long-beach-state',
  'uc-davis': 'california-davis',
  'hawai\'i': 'hawaii',
  'uc-irvine': 'california-irvine',
  'uc-santa barbara': 'california-santa-barbara',
  'north-carolina a&t': 'north-carolina-at',
  'north-carolina central': 'north-carolina-central',
  'maryland-eastern shore': 'maryland-eastern-shore',
  'south-carolina state': 'south-carolina-state',
  'alabama-a&m': 'alabama-am',
  'mississippi-valley state': 'mississippi-valley-state',
  'prairie-view a&m': 'prairie-view',
  'arkansas-pine bluff': 'arkansas-pine-bluff',
  'bowling-green': 'bowling-green-state',
  'loyola-chicago': 'loyola-il',
  'south-dakota state': 'south-dakota-state',
  'miami': 'miami-fl',
  'nc-state': 'north-carolina-state',
  'charleston': 'college-of-charleston',
  'ut-arlington': 'texas-arlington',
  'omaha': 'nebraska-omaha',
  'north-dakota state': 'north-dakota-state',
  'louisiana': 'louisiana-lafayette',
  'ul-monroe': 'louisiana-monroe',
  'mt.-st. mary\'s': 'mount-st-marys',
  'st.-francis (pa)': 'saint-francis-pa',
  'saint-peter\'s': 'saint-peters',
  'the-citadel': 'citadel',
  'st.-francis (bkn)': 'st-francis-ny',
  'portland-st': 'portland-state',
  'uic': 'illinois-chicago',
  'san-jose state': 'san-jose-state',
  'vmi': 'virginia-military-institute',
  'fort-wayne': 'ipfw',
  'lsu': 'louisiana-state',
  'east-tennessee state': 'east-tennessee-state',
  'sam-houston state': 'sam-houston-state',
  'stephen-f. austin': 'stephen-f-austin',
  'saint-joseph\'s': 'saint-josephs',
  'albany': 'albany-ny',
  'florida-gulf coast': 'florida-gulf-coast',
  'southeast-missouri state': 'southeast-missouri-state',
  'uc-riverside': 'california-riverside',
  'st.-bonaventure': 'st-bonaventure',
  'south-carolina upstate': 'south-carolina-upstate',
  'mcneese': 'mcneese-state',
  'umass-lowell': 'massachusetts-lowell',
  'umbc': 'maryland-baltimore-county',
  'loyola-(md)': 'loyola-md',
  'texas-a&m-cc': 'texas-am-corpus-christi',
  'se-louisiana': 'southeastern-louisiana',
  'st.-john\'s': 'st-johns-ny',
  'unc-asheville': 'north-carolina-asheville'
}

const populateTeamData = (team, data) => {
  data[team].srs = parent[5].children[1].data.split('(')[0].replace(' ', '').slice(0, -1);
  data[team].sos = parent[6].children[1].data.split('(')[0].replace(' ', '').slice(0, -1);
  parent = $('#team_stats tbody').children().first();
  const games = parseInt(parent[0].children[1].children[0].data);
  data[team].twos = parent[0].children[8].children[0].data;
  data[team].threes = parent[0].children[11].children[0].data;
  const oppParent = $('#team_stats tbody').children().first().next().next();
  data[team].opptwos = oppParent[0].children[8].children[0].data;
  data[team].oppthrees = oppParent[0].children[11].children[0].data;
  data[team].rebdiff = ((parseInt(parent[0].children[17].children[0].data) - parseInt(oppParent[0].children[17].children[0].data)) / games).toString().slice(0, 5);
  data[team].astdiff = ((parseInt(parent[0].children[18].children[0].data) - parseInt(oppParent[0].children[18].children[0].data)) / games).toString().slice(0, 5);
  data[team].todiff = ((parseInt(parent[0].children[21].children[0].data) - parseInt(oppParent[0].children[21].children[0].data)) / games).toString().slice(0, 5);

  return data;
}

router.get('/', (req, res, next) => {

  let url = 'http://www.espn.com/mens-college-basketball/matchup?gameId=' + req.query.id;

  axios.get(url)
    .then(res => {
      let $ = cheerio.load(res.data);
      let parent = ($('head title'));
      const road = {school: parent[0].children[0].data.split(' vs. ')[0].replace(' ', '-').toLowerCase()};
      const home = {school: parent[0].children[0].data.split(' vs. ')[1].split(' - ')[0].replace(' ', '-').toLowerCase()};
      const data = {id: req.query.id, road: road, home: home};
      parent = ($('body  #global-viewport #pane-main #custom-nav #gamepackage-header-wrap #gamepackage-matchup-wrap header .competitors .game-status span[data-behavior="date_time"]'));
      // if no start time listed, game can be considered final (unavailable for automatic halftime update)
      data.tipoff = parent[0] ? parent[0].attribs['data-date'] : 'final';
      return data;
    })
    // ROAD
    .then(data => {
      console.log('ROAD TEAM', data.road.school)
      if (schoolNameMap[data.road.school]) {
        data.road.school = schoolNameMap[data.road.school];
      }
      url = `https://www.sports-reference.com/cbb/schools/${data.road.school}/2018.html`;
      return axios.get(url)
        .then(res => {
          $ = cheerio.load(res.data);
          parent = $('#meta').children().first().next().children('p');
          populateTeamData('road', data);
          return data;
        })
    })
    // HOME
    .then(data => {
      console.log('HOME TEAM', data.home.school)
      if (schoolNameMap[data.home.school]) {
        data.home.school = schoolNameMap[data.home.school];
      }
      url = `https://www.sports-reference.com/cbb/schools/${data.home.school}/2018.html`;
      return axios.get(url)
        .then(res => {
          $ = cheerio.load(res.data);
          parent = $('#meta').children().first().next().children('p');
          populateTeamData('home', data);
          return data;
        })
    })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log('there has been an error retrieving pregame data')
    });

})

module.exports = router;
