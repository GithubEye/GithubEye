var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

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
    //TODO
});

app.post('/show_stars', urlencodedParser, function(req, res) {
    reponame=req.body.text_reponame;
    console.log(reponame);
    //TODO
});

// Create server and listen to CF Port
var port = process.env.PORT || 8080
var server = app.listen(port, function() {
  console.log('Server running');
});
