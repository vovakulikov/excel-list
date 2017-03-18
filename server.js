var express = require('express');
var http = require('http');
var path = require('path');

var app = express();
const api = require('./server/routes/api');

app.set('port',3000);

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

http.createServer(app).listen(app.get('port'),function(){
  console.log('Express server listening on port '+ app.get('port'))
})


