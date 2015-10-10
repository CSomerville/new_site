var express = require('express');
var morgan = require('morgan');

var routes = require('./server/routes');

var app = express();

app.use(morgan('dev'));
app.use(express.static('build'));

app.use('/', routes);

app.set('port', process.env.PORT || 8000);

var server = app.listen(app.get('port'), function(){
  console.log('app listening on port ' + server.address().port)
});