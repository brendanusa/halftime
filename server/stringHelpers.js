urls = ['http://www.espn.com/mens-college-basketball/game?gameId=400992489','http://www.espn.com/mens-college-basketball/game?gameId=400992522']

gameIDs = urls.map(url => parseInt(url.replace('http://www.espn.com/mens-college-basketball/game?gameId=',''))).toString();

console.log(gameIDs)
