var get_readme = require('./get_readme.js')

function split_sentence_to_word(str){
	str = str.toLowerCase();
	var result = [];
	var flag = true;
	var word_now = '';
	for(var i in str){
		if(str[i] >= 'a' && str[i] <= 'z'){
			if(!flag){
				flag = true;
				word_now = '';
			}
			word_now += str[i];
		}
		else{
			if(flag){
				result.push(word_now);
				word_now = '';
				flag = false;
			}
		}
	}
	if(flag)result.push(word_now);
	return result;
}

function eliminate_conjunctions(word_dict)
{
	var result = word_dict;
	var conjunctions = ['i' , 'you' , 'me' , 'we' , 
	'and' , 'or' , 'but' , 'of' , 'in' , 'on' , 'the' , 
	'at' , 'still' , 'since' , 'for' , 'over' , 'within' ,
	'a' , 'an' , 'by' , 'through' , 'over' , 'with' , 'without' ,
	'because' , 'owing' , 'over'];
	for(var i in conjunctions)
	{
		if(result[conjunctions[i]] > 0)
			result[conjunctions[i]] = 0;
	}
	return result;
}

function text_similarity(text , pattern)//text & pattern are strs, return a number
{
	var splitted_pattern = split_sentence_to_word(pattern)
	var words_in_pattern = {};
	for(var i in splitted_pattern)
	{
		if(words_in_pattern[splitted_pattern[i]] > 0)
			words_in_pattern[splitted_pattern[i]]++;
		else words_in_pattern[splitted_pattern[i]] = 1;
	}
	words_in_pattern = eliminate_conjunctions(words_in_pattern);

	var total_length = text.length

	var splitted_text = split_sentence_to_word(text);

	var result = 0;

	for(var i in splitted_text)
		if(words_in_pattern[splitted_text[i]] > 0)
			result += words_in_pattern[splitted_text[i]];
	
	return result / total_length;
}

module.exports = {
similarity_check : function(fullname , description , f)
{
	get_readme.get_readme(fullname , 
	function(readme_text)
	{
		console.log('readme text is ' + readme_text);
		var similarity = text_similarity(readme_text , description);
		f(similarity);
	});
}};