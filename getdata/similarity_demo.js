similarity_check = require('./similarity_check.js')

similarity_check.similarity_check('splintersu/hackfdu' , 'project' , 
	function(similarity)
	{
		console.log('the similarity is ' + similarity);
	})