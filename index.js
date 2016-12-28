var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
  res.status(200).send("HELLO!");
});

app.get('/cool',(req,res)=>{
	res.send(cool());
});

app.post('/hi',(req,res,next)=>{
  //var username = req.body.user_name;
  var json = {
    text: 'hi u a faggit!'
  };

  res.status(200).json(json);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


