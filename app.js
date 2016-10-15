var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var ejs = require('ejs');
var readme = require('./getdata/get_readme');
var stars = require('./getdata/get_stars');
var repo = require('./getdata/repo_list');
var following = require('./getdata/following_list');
var similarity = require('./getdata/similarity_check');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// Get page with a single imageg url input box
app.get('/', function(req, res) {
  var fs = require('fs');

  fs.readFile('views/index.html', function (err, data) {
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

    //TODO
});

app.post('/show_followings', urlencodedParser, function(req, res) {
    username=req.body.text_username;
    console.log(username);
    //TODO
});

app.post('/show_repos', urlencodedParser, function(req, res) {
    username=req.body.text_username;
    console.log(username);
    //TODO

});

app.post('/show_readme', urlencodedParser, function(req, res) {
    reponame=req.body.text_reponame;
    console.log(reponame);
    readme.get_readme(reponame, function(text, res){
        //TODO
        console.log(text);
        res.render('show_readme', {text: text});
    }, res);
    //TODO
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
