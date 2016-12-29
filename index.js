"use strict"
var RPSGame = require('./rpsgame');
var app = require('express')();
var bodyParser = require("body-parser");
var request = require('request');

var rpsGame = null;

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

  try
  {
    const pick = req.body.text.toLowerCase();
    if(pick == 'stanje')
    {
      res.status(200).json({text: 'Poizvedba za tockovnik poslana'});
      var json = rpsGame.getStatus();
    }
    else
    {
      res.status(200).json({text: 'Izzval si igro z robotom, pricakuj odgovor.'});
      var json = rpsGame.playWith(username,pick);
    }
    sendResponse(req.body.response_url,json);
  }catch(excStr){
    res.status(200).json({text: excStr});
  }
});

app.listen(app.get('port'), ()=>{
  rpsGame = new RPSGame();
  console.log('rps game tece na portu:', app.get('port'));
});

function sendResponse(url,json)
{
  request.post(url, {json},
      (error, response, body) => 
      {
          if (!error && response.statusCode == 200) {
              console.log(body);
      }
  });
}

