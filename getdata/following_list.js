function sleep(d){
  for(var t = Date.now();Date.now() - t <= d;);
}

function Get_follow(user,f){
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
	for(var i in user){
		options.path='/users/'+user[i]+'/following?client_id=4565735ff9352155de90&client_secret=0529ff26465042c495644a393337153facece8ad';
		var request;
		/*
		for(var i=0;i<10;i++)
		{
			try{*/
				//sleep(100);
				request = https.get(options, function(res) {
				console.log('Got response' + res.statusCode);
				str = "";
				//console.log(str);
	
				res.on('data', function(d) {
					str+=d;
				});
	
				res.on('end', function(d) {
					//console.log(str);
					var dict;
					dict= JSON.parse(str);
			
					for(var i in dict)
					{
						username.push(dict[i]['login'])
					}
					//console.log(username);
				});
			
				});
				request.on('error', function(e) {
					console.error(e);
				});
				request.on('close' , function(){
					count++;
					if(count == user.length)
					{
						//console.log('sdasd   '+username);
						f(username);
					}
				});
				break;
			}/*
			catch(e){
				console.log('fuck');
				continue;
			}*/
		}
	}
	
}


module.exports = {
following_list : function(str_user,f , res){
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
	});
		
}
}