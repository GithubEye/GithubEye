get_stars = require('./get_stars.js')

get_stars.get_stars('splintersu/hackfdu' , 
	function(stars){console.log('stars:' + stars)} , null)
