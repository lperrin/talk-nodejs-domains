var express = require('express'),
    app = express();

app.get('/greeting/:name', function (req, res) {
  var name = req.params.name;
  res.send('Hello, ' + name + ', your name is ' + name.length + ' letters long.');
});

app.listen(3000);
console.log('Listening');