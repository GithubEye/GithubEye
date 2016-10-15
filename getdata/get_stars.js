module.exports = {
get_stars : function(fullname , f)
{
	var options = {
		host : 'api.github.com' , 
		path : '/repos/' + fullname + '/stargazers' ,
		method : 'GET' , 
		headers : {'user-agent' : 'GooHub App'}
	};

	var result = 0

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
				result = tmp.length
			});
		})
	request.on('error' , function(e){console.log('got error' , e.message);});
	request.on('close' , function(){f(result)});
}};
