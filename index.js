"use strict"
var RPSGame = require('./rpsgame');
var rpsGame = null;
var app = require('express')();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set('port', (process.env.PORT || 5000));

app.get('/', (req, res) => {
  res.status(200).send("WHATS MY PURPOSE IN LIFE, HUMAN?");
});

app.post('/kps',(req,res,next)=>{
  const username = req.body.user_name;

  if(username == "slackbot")
  { 
    res.status(200).end();
    return;
  }

  const pick = req.body.text.toLowerCase();
  const json = rpsGame.playWith(username,pick);

  res.status(200).json(json);
});

app.listen(app.get('port'), ()=>{
  rpsGame = new RPSGame();
  console.log('rps game running on port:', app.get('port'));
});


