similarity_check = require('./similarity_check.js')

similarity_check.similarity_check('karpathy/char-rnn' , 'I want to get a VECTOR representation of a sentence, which uses RNN or CNN on word level' , 
	function(similarity)
	{
		console.log('the similarity is ' + similarity);
	} , null)