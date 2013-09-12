var fs = require('fs');

fs.readFile(__filename, {encoding: 'utf8'}, function (err, lines) {
  console.log('I am', lines.split(/\n/g).length, 'lines long.');
});

setTimeout(function () {
  console.log('done waiting');
}, 1000);