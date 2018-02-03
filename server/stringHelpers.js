urls = ['http://www.espn.com/mens-college-basketball/game?gameId=400987339'];

gameIDsRows = urls.map(url => parseInt(url.replace('http://www.espn.com/mens-college-basketball/game?gameId=',''))).toString();

gameIDsString = urls.map(url => url.replace('http://www.espn.com/mens-college-basketball/game?gameId=','')).join()

console.log(gameIDsString)

