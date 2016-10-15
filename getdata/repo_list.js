module.exports = {
repo_list : function(user , f)
{
	var options = {
		host : 'api.github.com' , 
		path : '/users/' + 'splintersu' + '/repos' ,
		method : 'GET' , 
		headers : {'user-agent' : 'GooHub App'}
	};

	var result = new Array();

	var https = require('https');
	var request = https.get(options,
		function(res){
			var full_respond = '';
			console.log('Got response' + res.statusCode);

			res.on('data' , function(data){
				full_respond += data;
			});

			res.on('end' , function(){
				var tmp = JSON.parse(full_respond);
				for(var i in tmp)
				{
					result.push(tmp[i]['full_name'])
					//console.log('push' + tmp[i]['full_name'])
				}
			})
			
		})
	request.on('error' , function(e){console.log('got error' , e.message);});
	request.on('close' , function(){f(result)})
}
}