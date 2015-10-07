var fs = require('fs')

var welcome = {};
module.exports = welcome;

welcome.index = function(req, res) {
  fs.readFile('./server/views/index.html', 'utf8', function(err, page){
    if (err) {
      console.error(err);
    } else {
      res.send(page);
    }
  })
}