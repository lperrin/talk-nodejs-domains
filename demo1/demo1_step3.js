var fs = require('fs'),
    domain = require('domain');

var d1 = domain.create();
d1.no = 1;

d1.enter();

fs.readFile(__filename, {encoding: 'utf8'}, function (err, lines /*, d1 */) {
  console.log('I am', lines.split(/\n/g).length, 'lines long.');
  console.log('fs.readFile is in:', domain.active.no);
  d1.exit();
}/*, d1 */);

var d2 = domain.create();
d2.no = 2;

d2.enter();

setTimeout(function (/* d2 */) {
  console.log('setTimeout is in:', domain.active.no);
  d2.exit();
}, 1000 /*, d2 */);