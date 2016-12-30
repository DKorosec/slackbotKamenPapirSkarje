var RPSGame = require('./rpsgame');
var app = (require('express'))();
var bodyParser = require("body-parser");
var requestify = require('requestify');
var SimpleStorage = require('./simplestorage');

var rpsGame = null;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', (process.env.PORT || 5000));

app.get('/', (req, res) => {
  res.status(200).send("WHATS MY PURPOSE IN LIFE, HUMAN?");
});

app.post('/kps', (req, res, next) => {
  const username = req.body.user_name;

  if (rpsGame == null || username == "slackbot") {
    return res.status(200).end();
  }
  var db = new SimpleStorage();
  try {
    const pick = req.body.text.toLowerCase();
    if (pick == 'stanje') {
      var json = rpsGame.getStatus();
      res.status(200).json({ text: 'Poizvedba za tockovnik poslana' });
      sendResponse(req.body.response_url, json);
    } else {
      var json = rpsGame.playWith(username, pick);
      res.status(200).json({ text: 'Izzval si igro z robotom, pricakuj odgovor.' });
      db.writeObject(rpsGame.scoreTable.players, () => {
        sendResponse(req.body.response_url, json);
      });
    }
  } catch (excStr) {
    res.status(200).json({ text: excStr });
  }
});

app.listen(app.get('port'), () => {
  var db = new SimpleStorage();
  console.log("povezujem z bazo...");
  db.readObject((playersState) => {
    rpsGame = new RPSGame(playersState);
    console.log('rps game tece na portu:', app.get('port'));
  });
});

function sendResponse(url, data) {
  requestify.post(url, data);
}