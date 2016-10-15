module.exports = {
get_stars : function(fullname , f , extra_res)
{
	//f(0 , extra_res);
	//return;

	var options = {
		host : 'api.github.com' , 
		path : '/repos/' + fullname + '?client_id=4565735ff9352155de90&client_secret=0529ff26465042c495644a393337153facece8ad' ,
		method : 'GET' , 
		headers : {'user-agent' : 'GooHub App'}
	};

	var result = 0

	console.log('#now calling [get_stars]#')

	var https = require('https');
	var request = https.get(options,
		function(res){
			var full_respond = '';
			console.log('Got response' + res.statusCode);

			var local_timer = setTimeout(function(){
					request.destroy();
					console.log('request star timeout!');
				} , 15000);

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
					console.log('something ****ing has happended again , ' , err);
					tmp = {'stargazers_count' : 0};
				}
				finally
				{
					result = tmp['stargazers_count']
				};
			});
		})

	

	request.on('error' , function(e){console.log('got error' , e.message);});
	request.on('close' , function(){if(extra_res == null)f(result);else f(result , extra_res);});
}};
