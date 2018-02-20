urls = ['http://www.espn.com/mens-college-basketball/game?gameId=400990685','http://www.espn.com/mens-college-basketball/game?gameId=400991020','http://www.espn.com/mens-college-basketball/game?gameId=400991330','http://www.espn.com/mens-college-basketball/game?gameId=400991331','http://www.espn.com/mens-college-basketball/game?gameId=400991332','http://www.espn.com/mens-college-basketball/game?gameId=400991333','http://www.espn.com/mens-college-basketball/game?gameId=400986922','http://www.espn.com/mens-college-basketball/game?gameId=400986898','http://www.espn.com/mens-college-basketball/game?gameId=400988355','http://www.espn.com/mens-college-basketball/game?gameId=400986987','http://www.espn.com/mens-college-basketball/game?gameId=400992438','http://www.espn.com/mens-college-basketball/game?gameId=400992514','http://www.espn.com/mens-college-basketball/game?gameId=400988354','http://www.espn.com/mens-college-basketball/game?gameId=400986970','http://www.espn.com/mens-college-basketball/game?gameId=400988356','http://www.espn.com/mens-college-basketball/game?gameId=400986871','http://www.espn.com/mens-college-basketball/game?gameId=400988357'];

gameIDsRows = urls.map(url => parseInt(url.replace('http://www.espn.com/mens-college-basketball/game?gameId=',''))).toString();

gameIDsString = urls.map(url => url.replace('http://www.espn.com/mens-college-basketball/game?gameId=','')).join()

console.log(gameIDsString)

400986541,400987350,400988089