similarity_check = require('./similarity_check.js')

similarity_check.similarity_check('splintersu/toyRepo' , 'project' , 
	function(similarity)
	{
		console.log('the similarity is ' + similarity);
	} , null)