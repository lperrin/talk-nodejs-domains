var fs = require('fs'),
    request = require('request'),
    mysql = require('mysql'),
    async = require('async'),
    velib = JSON.parse(fs.readFileSync('/Users/laurent/Downloads/Paris.json'));

function populateCouchDB(done) {
  async.each(velib, function (station, done) {
    station._id = station.number.toString();

    request({
      method: 'POST',
      url: 'http://localhost:5984/velib',
      json: station
    }, done);
  }, done);
}

function populateMySQL(done) {
  var pool = mysql.createPool({
    "host": "localhost",
    "user": "front",
    "password": "fr0nt",
    "database": "velib"
  });

  pool.getConnection(function (err, connection) {
    if (err)
      throw err;

    async.each(velib, function (station, done) {
      connection.query('insert into stations (id, name, address) values (' +
          mysql.escape(station.number) + ', ' +
          mysql.escape(station.name) + ', ' +
          mysql.escape(station.address) + ')', done);
    }, function () {
      connection.release(done);
    });
  });
}

populateMySQL(function () {
  console.log('done');
});