var following_list = require('./following_list.js');

var links = [];
var nodes = [];

function display()
{
	console.log(JSON.stringify(nodes));
	console.log(JSON.stringify(links));
}

following_list.following_list_naive('splintersu' , 
	function(userlist){
		userlist.push('splintersu');
		for(var i in userlist)
			nodes.push({'category' : 1 , 'name' : userlist[i] , 'value' : 3});
		var hashtable = {};
		for(var i in userlist)
			hashtable[userlist[i]] = 1;
		var count = 0;
		for(var i in userlist)
		{
			following_list.following_list_naive(userlist[i] ,
				function(userlist2 , source){
					count++;
					for(var j in userlist2)
					{
						if(typeof(hashtable[userlist2[j]]) != 'undefined')
						{
							links.push({'source' : source , 'target' : userlist2[j]});
						}
					}
					if(count == userlist.length)
					{
						console.log('finish');
						display();
					}
				} , userlist[i])
		}
	} , null);

