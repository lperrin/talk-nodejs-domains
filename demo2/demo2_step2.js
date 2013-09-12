var domain = require('domain'),
    express = require('express'),
    app = express();

var domainCount = 0;

app.use(function (req, res, next) {
  var d = domain.create();
  d.id = domainCount++;
  d.name = req.path;

  d.run(next);

  res.on('finish', function () {
    d.exit();
  });
});

app.get('/greeting/:name', function (req, res) {
  res.send(getGreeting(req.params.name));
});

function getGreeting(name) {
  return 'Hello, ' + name + '. You are in domain (' + domain.active.name + ', ' + domain.active.id + ').';
}

app.listen(3000);
console.log('Listening');
