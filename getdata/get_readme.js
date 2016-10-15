function i_get_readme(fullname , f , extra_res)
{
	var options = {
	host : 'raw.githubusercontent.com' , 
	path : '/' + fullname + '/master/readme.md' ,
	method : 'GET' , 
	headers : {'user-agent' : 'GooHub App'}
	};

	var result = '';

	console.log('#now calling [get_readme]#');

	var https = require('https');
	var request = https.get(options,
		function(res){
			console.log('Got response' + res.statusCode);
			res.on('data' , function(data){
				result += data;
			});
		})
	request.on('error' , function(e){console.log('got error' , e.message);});
	request.on('close' , function(){if(extra_res == null)f(result);else f(result , extra_res)});
}
function i_get_Readme(fullname , f , extra_res)
{
	var options = {
		host : 'raw.githubusercontent.com' , 
		path : '/' + fullname + '/master/Readme.md' ,
		method : 'GET' , 
		headers : {'user-agent' : 'GooHub App'}
	};

	var result = '';

	console.log('#now calling [get_Readme]#');

	var https = require('https');
	var request = https.get(options,
		function(res){
			console.log('Got response' + res.statusCode);
			if(res.statusCode == 404)
			{
				i_get_readme(fullname , f , extra_res);
				return;
			}
			res.on('data' , function(data){
				result += data;
			});
		})
	request.on('error' , function(e){console.log('got error' , e.message);});
	request.on('close' , function(){if(extra_res == null)f(result);else f(result , extra_res)});
}
function i_get_README(fullname , f , extra_res)
{
	var options = {
		host : 'raw.githubusercontent.com' , 
		path : '/' + fullname + '/master/README.md' ,
		method : 'GET' , 
		headers : {'user-agent' : 'GooHub App'}
	};

	var result = '';

	console.log('#now calling [get_README]#');

	var https = require('https');
	var request = https.get(options,
		function(res){
			console.log('Got response' + res.statusCode);
			if(res.statusCode == 404)
			{
				i_get_Readme(fullname , f , extra_res);
				return;
			}
			res.on('data' , function(data){
				result += data;
			});
		})
	request.on('error' , function(e){console.log('got error' , e.message);});
	request.on('close' , function(){if(extra_res == null)f(result);else f(result , extra_res)});
}

module.exports = {
get_readme : function(fullname , f , extra_res)
{
	i_get_README(fullname , f , extra_res);
}};