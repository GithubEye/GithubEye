var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var ejs = require('ejs');
var util = require('util');
var assert = require('assert');
var cfenv = require('cfenv');
var appenv = cfenv.getAppEnv();
var services = appenv.services;
var mongodb_services = services["compose-for-mongodb"];
var MongoClient = require('mongodb').MongoClient;
var mongodb;

if(mongodb_services){
    var mongodb_credentials=mongodb_services[0].credentials;
    var mongodb_ca=[new Buffer(mongodb_credentials.ca_certificate_base64, 'base64')];

    MongoClient.connect(mongodb_credentials.uri, {
        mongos: {
            ssl: true,
            sslValidate: true,
            sslCA: mongodb_ca,
            poolSize: 1,
            reconnectTries: 1
        }
    }, function(err, db){
        if (err){
            console.log(err);
        } else{
            mongodb=db.db("githubeye");
        }
    });
} else{
    MongoClient.connect('mongodb://localhost:27017/githubeye',
            function(err, db){
                if(err){
                    console.log(err);
                } else{
                    mongodb=db;
                }
            })
}

//Local modules
var readme = require('./getdata/get_readme');
var stars = require('./getdata/get_stars');
var repo = require('./getdata/repo_list');
var following = require('./getdata/following_list');
var similarity = require('./getdata/similarity_check');
var search = require('./getdata/search.js');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// Get page with a single imageg url input box
app.get('/', function(req, res) {
  var fs = require('fs');

  fs.readFile('views/search_page.html', function (err, data) {
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Content-Length': data.length
    });
    res.write(data);
    res.end();
  });

  mongodb.collection("visitors").updateOne({"count": {$ne: null}},
      {$inc: {"count": 1}},
      function(err, result){
          if(err){
              console.log(err);
          } else{
              if(result.result.nModified==0){
                  mongodb.collection("visitors").insertOne({"count":1},
                      function(err, result){
                          if(err){
                              console.log(err);
                          } else{
                              console.log("Successfully update visitors count!");
                              mongodb.collection("visitors").find({"count": {$ne: null}}).toArray(
                                  function(err, visitor_count){
                                      console.log("Currently we have %d visitors!",
                                          visitor_count[0].count);
                                  });
                          }
                      })
              }else{
                  console.log("Successfully update visitors count!");
                  mongodb.collection("visitors").find({"count": {$ne: null}}).toArray(
                      function(err, visitor_count){
                          console.log("Currently we have %d visitors!",
                              visitor_count[0].count);
                      });
              }
          }
      });
});

app.get('/about_us', function(req, res) {
  var fs = require('fs');

  fs.readFile('views/about_us.html', function (err, data) {
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Content-Length': data.length
    });
    res.write(data);
    res.end();
  });
});

app.get('/relations', function(req, res) {
  var fs = require('fs');

  fs.readFile('views/relations_page.html', function (err, data) {
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Content-Length': data.length
    });
    res.write(data);
    res.end();
  });
});


app.post('/search_similar_repo', urlencodedParser, function(req, res) {
    username=req.body.text_username;
    description=req.body.text_description;
    console.log(username);
    console.log(description);
    console.log("---------------------");
    search.search_naive(username, description, function(results, res){
        console.log(results);
        res.render('result_page', {repo_list: results});
    }, res);
});

app.post('/search_results', urlencodedParser, function(req, res) {
    username=req.body.text_username;
    description=req.body.text_description;
    console.log(username);
    console.log(description);
    console.log("--------------------");
    search.search_naive(username, description, function(results, res){
        console.log(results);
        res.render('result_page', {repo_list: results});
    }, res);
});


app.post('/show_followings', urlencodedParser, function(req, res) {
    username=req.body.text_username;
    console.log(username);
    following.following_list(username,function(fullname_list,extra_res){
	console.log(username);
	console.log(fullname_list);
	for(fullname in fullname_list){
		console.log(fullname_list[fullname]);
	}
	res.render('show_following',{following_list:fullname_list});
},res);
});

app.post('/show_repos', urlencodedParser, function(req, res) {
    username=req.body.text_username;
    console.log(username);
    repo.repo_list(username, function(fullname_list, res) {
        console.log(fullname_list);
        for(fullname in fullname_list){
            console.log(fullname_list[fullname]);
        }
        res.render('show_repolist', {repolist: fullname_list});
    }, res);
});

app.post('/show_readme', urlencodedParser, function(req, res) {
    reponame=req.body.text_reponame;
    console.log(reponame);
    readme.get_readme(reponame, function(text, res){
        console.log(text);
        res.render('show_readme', {text: text});
    }, res);
});

app.post('/show_stars', urlencodedParser, function(req, res) {
    reponame=req.body.text_reponame;
    console.log(reponame);
    stars.get_stars(reponame,function(number_of_stars,res){
       res.render('show_stars',{number_of_stars:number_of_stars});
    },res);
});

// Create server and listen to CF Port
var port = process.env.PORT || 8080
var server = app.listen(port, function() {
  console.log('Server running');
});
