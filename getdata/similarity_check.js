var get_readme = require('./get_readme.js')

function split_sentence_to_word(str){
	var result = [];
	var flag = true;
	var word_now = '';
	var special = false;
	for(var i in str){
		if(flag)
		{
			if((str[i] >= 'a' && str[i] <= 'z') || (str[i] >= '0' && str[i] <= '9')
				|| (str[i] >= 'A' && str[i] <= 'Z'))
			{
				word_now += str[i];
				if(str[i] >= 'A' && str[i] <= 'Z')
					special = true;
				if(str[i] >= '0' && str[i] <= '9')
					special = true;
				if(str[i] == '_')
					special = true;
				if(str[i] == '-')
					special = true;
			}
			else
			{
				flag = false;
				if(special)
					word_now = word_now.toUpperCase();
				else word_now = word_now.toLowerCase();
				special = false;
				result.push(word_now);
				word_now = '';
			}
		}
		else
		{
			if((str[i] >= 'a' && str[i] <= 'z') || (str[i] >= '0' && str[i] <= '9')
				|| (str[i] >= 'A' && str[i] <= 'Z'))
			{
				if(str[i] >= 'A' && str[i] <= 'Z')
					special = true;
				if(str[i] >= '0' && str[i] <= '9')
					special = true;
				if(str[i] == '_')special = true;
				if(str[i] == '-')special = true;
				flag = true;
				word_now = str[i];
			}
		}
	}
	if(flag)
	{
		if(special)word_now = word_now.toUpperCase();
		else word_now = word_now.toLowerCase();
		result.push(word_now);
	}
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

function text_similarity_v2(text , words_in_pattern)
{
	var total_length = text.length

	var splitted_text = split_sentence_to_word(text);

	var result = 0;

	for(var i in splitted_text)
		if(words_in_pattern[splitted_text[i]] > 0)
			result += words_in_pattern[splitted_text[i]];
	
	return result;
	//return result / (total_length + 10);
}

function text_similarity(text , pattern)//text & pattern are strs, return a number
{
	var splitted_pattern = split_sentence_to_word(pattern)
	var words_in_pattern = {};
	for(var i in splitted_pattern)
	{
		if(words_in_pattern[splitted_pattern[i].toLowerCase()] > 0)
			words_in_pattern[splitted_pattern[i].toLowerCase()]++;
		else
		{
			if(splitted_pattern[i] == splitted_pattern[i].toUpperCase())
				words_in_pattern[splitted_pattern[i].toLowerCase()] = 4;
			else
				words_in_pattern[splitted_pattern[i]] = 1;
		}
	}
	words_in_pattern = eliminate_conjunctions(words_in_pattern);

	return text_similarity_v2(text , words_in_pattern);
}

module.exports = {
similarity_check : function(fullname , description , f , extra_res)
{
	console.log('#now calling [similarity_check]#');
	get_readme.get_readme(fullname , 
	function(readme_text)
	{
		//console.log('readme text is ' + readme_text);
		var similarity = text_similarity(readme_text , description);
		if(extra_res == null)f(similarity);else f(similarity , extra_res);
	});
},
get_words_in_pattern : function(pattern)
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
	return words_in_pattern;
},
similarity_check_version_v2 : function(fullname , words_in_desc , f , extra_res)
{
	console.log('#now calling [similarity_check]v2#');
	get_readme.get_readme(fullname , 
	function(readme_text)
	{
		var similarity = text_similarity_v2(readme_text , words_in_desc);
		if(extra_res == null)f(similarity);else f(similarity , extra_res);
	})
}
};