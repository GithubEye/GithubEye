module.exports = {
get_image : function(username , f , extra_res){
	var https = require('https');
	var dict;
	var options = {
		host : 'api.github.com' , 
		path : '/users/splintersu/following' , 
		//curl -i 'https://api.github.com/users/whatever?client_id=xxxx&client_secret=yyyy'
		method : 'GET' , 
		headers : {'user-agent' : 'GooHub'}
	}
	options.path='/users/'+username+'?client_id=4565735ff9352155de90&client_secret=0529ff26465042c495644a393337153facece8ad';
	request = https.get(options, function(res) {
		str = "";
		//console.log(str);
	
		res.on('data', function(d) {
			str+=d;
		});
	
		res.on('end', function(d) {
			//console.log(str);
			
			dict= JSON.parse(str);
			//console.log(dict);
			//console.log(dict['avatar_url']);
		});
	});
	request.on('error', function(e) {
		console.error(e);
	});
	request.on('close' , function(){
		if(extra_res == null)f(dict['avatar_url']);
		else f(dict['avatar_url'] , extra_res);
	});
}
}