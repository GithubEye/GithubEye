module.exports = {
get_readme : function(fullname , f)
{
	var options = {
		host : 'raw.githubusercontent.com' , 
		path : '/' + fullname + '/master/README.md' ,
		method : 'GET' , 
		headers : {'user-agent' : 'GooHub App'}
	};

	var result = '';

	var https = require('https');
	var request = https.get(options,
		function(res){
			console.log('Got response' + res.statusCode);
			res.on('data' , function(data){
				result += data;
			});
		})
	request.on('error' , function(e){console.log('got error' , e.message);});
	request.on('close' , function(){f(result)});
}};
