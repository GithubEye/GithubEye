get_stars = require('./get_stars.js')

get_stars.get_stars('torvalds/linux' , 
	function(stars){console.log('stars:' + stars)} , null)
