var domain = require('domain'),
    express = require('express'),
    request = require('request'),
    app = express();

app.use(function (req, res, next) {
  var d = domain.create();
  d.add(req);
  d.add(res);

  d.run(next);

  d.on('error', function (err) {
    console.log(req.path, 'throwed');

    res.send(500, 'Sorry.');

    throw err;
  });

  res.on('finish', function () {
    d.exit();
  });
});

app.get('/velib/:id', function (req, res) {
  request.get({
    url: 'http://localhost:5984/velib/' + req.params.id,
    json: true
  }, function (err, response, blob) {
    res.send(blob.name.replace(/^\d+\s+\- /, ''));
  });
});

app.listen(3000, function () {
  console.log('Listening');
});
