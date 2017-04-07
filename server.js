// todo: you've lost a lot of dependencies at package.json which are needed to start server
// todo: please be careful and always add --save or --save-dev options when installing dependencies

const express = require('express');
const http = require('http');
const path = require('path');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const app = express();
// todo: Maybe you can split server/io into separate module? Try to think how else you can solve 'io' problem
const server = http.createServer(app);
const api = require('./server/routes/api');
const user = require('./server/routes/user');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./api/swagger/swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
// todo: you're not football player. do not leave more than one line break :)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

server.listen(app.get('port'),function(){
  // try install and use 'debug' module for debug messages
  console.log('Express server listening on port '+ app.get('port'));
});
