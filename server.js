const express = require('express');
const http = require('http');
const path = require('path');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');

const app = express();
const api = require('./server/routes/api');
const user = require('./server/routes/user');

app.set('port',3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));

app.use(passport.initialize());
app.use(passport.session());

require('./server/config/config.passport')(passport);

app.use('/users', user);
app.use('/api', api);





app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});



http.createServer(app).listen(app.get('port'),function(){
  console.log('Express server listening on port '+ app.get('port'))
})


