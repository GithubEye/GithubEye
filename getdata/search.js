following_list = require('./following_list.js');
get_stars = require('./get_stars.js');
repo_list = require('./repo_list.js');
similarity_check = require('./similarity_check.js');

function evaluate(instance)
{
	return (instance[1] + 0.1) * (instance[2] + 1);
}

function fun2(ext_repolist , f , extra_res)
{
	var tmp;
	for(var i = 0 ; i < ext_repolist.length ; i++)
		for(var j = 1 ; j < ext_repolist.length ; j++)
		{
			if(evaluate(ext_repolist[j - 1]) < evaluate(ext_repolist[j]))
			{
				tmp = ext_repolist[j - 1];
				ext_repolist[j - 1] = ext_repolist[j];
				ext_repolist[j] = tmp;
			}
		}
	if(extra_res == null)f(ext_repolist);
	else f(ext_repolist , extra_res);
}

function fun(repolist , desc , f , extra_res)
{
	var ext_repolist = [];
	for(var i in repolist)
		ext_repolist.push([repolist[i] , 0 , 0]);
	var count = 0;
	for(var i in repolist)
	{
		get_stars.get_stars(repolist[i] , 
		function(stars , tmp_i){
			console.log('get stars ' + stars);
			ext_repolist[tmp_i][2] = stars;
			count += 1;
		} , i);
	}
	var words_in_pattern = similarity_check.get_words_in_pattern(desc);
	var count2 = 0;
	for(var i in repolist)
	{
		similarity_check.similarity_check_version_v2(repolist[i] , words_in_pattern ,
		function(similarity , tmp_i){
			console.log('get similarity' , similarity);
			ext_repolist[tmp_i][1] = similarity;
			count2 += 1;
		} , i)
	}

	var call_back_func = function(){
		if(count == repolist.length && count2 == repolist.length)
		{
			fun2(ext_repolist , f , extra_res);
			return;
		}
		else
		{
			setTimeout(call_back_func , 5000);
		}
	}
	setTimeout(call_back_func , 5000);
}

module.exports = {
	search : function(user , desc , f , extra_res)
	{
		following_list.following_list(user ,
		function(namelist)
		{
			var repo = [];
			var repo_finish_count = 0;
			console.log('namelist:' , namelist);
			for(var i in namelist)
			{
				repo_list.repo_list(namelist[i] , 
				function(repolist_of_this_person)
				{
					console.log('repolist_of_this_person' , repolist_of_this_person);
					repo = repo.concat(repolist_of_this_person);
					repo_finish_count += 1
				} , null)
			}
			/*
			for(var t = Date.now(); Date.now() - t <= 100000;)
			{
				if(repo_finish_count == namelist.length)
				{
					fun(repo , desc , f , extra_res);
					return;
				}
			}
			*/
			var call_back_func = function(){
				if(repo_finish_count == namelist.length)
				{
					fun(repo , desc , f , extra_res);
					return;
				}
				else
				{
					setTimeout(call_back_func , 5000);
				}
			};
			setTimeout(call_back_func , 5000);
		} , null)
	}
};