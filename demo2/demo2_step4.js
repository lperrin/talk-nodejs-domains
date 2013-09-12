var domain = require('domain'),
    express = require('express'),
    mysql = require('mysql'),
    app = express();

app.use(function (req, res, next) {
  var d = domain.create();
  d.name = req.path;
  d.add(req);
  d.add(res);

  d.run(next);

  d.on('error', function (err) {
    console.log(domain.active.name, 'throwed');

    res.send(500, 'Sorry.');

    throw err;
  });

  res.on('finish', function () {
    d.exit();
  });
});

var pool = mysql.createPool({
  "host": "localhost",
  "user": "front",
  "password": "fr0nt",
  "database": "velib"
});

app.get('/velib/:id', function (req, res) {
  pool.getConnection(function (err, connection) {
    if (err)
      return res.send(500, err.message);

    connection.query('select * from stations where id = ?', [req.params.id], function (err, rows) {
      connection.release();
      res.send(rows[0].name.replace(/^\d+\s+\- /, ''));
    });
  });
});

app.listen(3000, function () {
  console.log('Listening');
});
