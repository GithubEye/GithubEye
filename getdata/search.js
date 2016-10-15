following_list = require('./following_list.js');
get_stars = require('./get_stars.js');
repo_list = require('./repo_list.js');

module.exports = {
	search : function(user , desc , f , extra_res)
	{
		following_list.following_list(user ,
		function(namelist)
		{
			var repo = [];
			for(var i in namelist)
			{
				repo_list.repo_list(namelist[i] , 
				function(repolist_of_this_person)
				{
					repo.concat(repolist_of_this_person)
				} , null)
			}
		} , null)
	}
};