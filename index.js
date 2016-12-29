var RPSGame = require('./rpsgame');
var app = (require('express'))();
var bodyParser = require("body-parser");
var requestify = require('requestify');


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
    return res.status(200).end();
  }

  try
  {
    const pick = req.body.text.toLowerCase();
    if(pick == 'stanje')
    {
      var json = rpsGame.getStatus();
      res.status(200).json({text: 'Poizvedba za tockovnik poslana'});
    }
    else
    {
      var json = rpsGame.playWith(username,pick);
      res.status(200).json({text: 'Izzval si igro z robotom, pricakuj odgovor.'});
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

function sendResponse(url,data)
{
  requestify.post(url,data);
}

