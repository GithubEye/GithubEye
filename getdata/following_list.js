function sleep(period)
{
	for(var t = Date.now() ; Date.now() - t < period;)
	{}
}
function Get_follow(user, f , extra_res){
	var https = require('https');
	var options = {
		host : 'api.github.com' , 
		path : '/users/splintersu/following' , 
		method : 'GET' , 
		headers : {'user-agent' : 'GooHub'}
	}
	var username=new Array();
	var str = "";
	var count = 0;
	for(var batch = 0 ; batch < Math.floor(user.length / 3) + 1 ; batch++){
		count = 0;
		for(var i = batch * 3 ; i < batch * 3 + 3 && i < user.length ; i++){
			options.path='/users/'+user[i]+'/following?client_id=4565735ff9352155de90&client_secret=0529ff26465042c495644a393337153facece8ad';
			var request;
			request = https.get(options, function(res) {
			console.log('Got response' + res.statusCode);
			str = "";

			res.on('data', function(d) {
				str+=d;
			});

			res.on('end', function(d) {
				var dict;
				try
				{
					dict= JSON.parse(str);
				}
				catch(err){
					console.log('WTF!something fucking has happened!')
					dict = null;
				}
				finally
				{
					for(var j in dict)
						username.push(dict[j]['login']);
				};
			});
		
			});
			request.on('error', function(e) {
				console.error(e);
			});
			request.on('close' , function(){
				count++;
				if(count == user.length)
				{
					if(extra_res == null)f(username);
					else f(username , extra_res);
				}
			});
		}
		//sleep(200);
	}
}


module.exports = {
following_list : function(str_user, f , res){
	//var dict={};
	var user=new Array();
	user.push(str_user);
	
	console.log('#now calling [following_list]#')

	var request=Get_follow(user,function(username){
		//console.log(username);
		var all_user=new Array();
		var hash={};
		
		for(var i in username){
				hash[username[i]]=1;
				all_user.push(username[i]);
			}
		//console.log('1:'+all_user);
		//var all_user2 = new Array();
		Get_follow(username,function(username2){
			for(var i in username2){
				//console.log(username2[i] + ' = ' + hash[username2[i]]);
				if(typeof(hash[username2[i]])=='undefined') 
				//if(!hash[username2[i]])
				all_user.push(username2[i]);
			}
			//console.log('2'+all_user);
			f(all_user , res);
		});
	} , null);
} , 
following_list_naive : function(str_user , f , res)
{Get_follow([str_user] , f , res);}
}