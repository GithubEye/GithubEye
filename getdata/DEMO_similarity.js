similarity_check = require('./similarity_check.js')

similarity_check.similarity_check('tesseract2048/kryo' , 'JAVA graph' , 
	function(similarity)
	{
		console.log('the similarity is ' + similarity);
	} , null)