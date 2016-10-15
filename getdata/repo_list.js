module.exports = {
repo_list : function(username , f , extra_res)
{
	var options = {
		host : 'api.github.com' , 
		path : '/users/' + username + '/repos?client_id=4565735ff9352155de90&client_secret=0529ff26465042c495644a393337153facece8ad' ,
		method : 'GET' , 
		headers : {'user-agent' : 'GooHub App'}
	};

	var result = new Array();

	console.log('#now calling [repo_list]#')

	var https = require('https');
	var request = https.get(options,
		function(res){
			var full_respond = '';
			console.log('Got response' + res.statusCode);

			var local_timer = setTimeout(function(){
				request.destroy();
				console.log('get repo_list timeout');
			} , 30000)

			res.on('data' , function(data){
				full_respond += data;
			});

			res.on('end' , function(){
				clearTimeout(local_timer);
				try
				{
					var tmp = JSON.parse(full_respond);
				}
				catch(err)
				{
					console.log('Something fucking just happened , ' , err);
					tmp = null;
				}
				finally
				{
					for(var i in tmp)
					{
						result.push(tmp[i]['full_name']);
						//console.log('push' + tmp[i]['full_name'])
					}
				};
			})
			
		})
	request.on('error' , function(e){console.log('got error' , e.message);request.close();});
	request.on('close' , function(){if(extra_res == null)f(result);else f(result , extra_res);});
}};
