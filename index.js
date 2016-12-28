var express = require('express');
var app = express();
var bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended: true}));

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
  res.status(200).send("HELLO!");
});

app.get('/cool',(req,res)=>{
	res.send(cool());
});

app.post('/hi',(req,res,next)=>{
  var username = req.body.user_name;
  var json = {
    text: 'hi '+username+' u a faggit!'
  };

  if(username == "slackbot")
    res.status(200).end();
  else res.status(200).json(json);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


