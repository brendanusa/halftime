urls = ['http://www.espn.com/mens-college-basketball/game?gameId=400986227','http://www.espn.com/mens-college-basketball/game?gameId=400986533','']

gameIDs = urls.map(url => parseInt(url.replace('http://www.espn.com/mens-college-basketball/game?gameId=',''))).toString();

console.log(gameIDs)

