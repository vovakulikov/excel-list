const express = require('express');
const http = require('http');
const path = require('path');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

const api = require('./server/routes/api');
const user = require('./server/routes/user')(io);


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





app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


io.on('connection', function(socket){
  console.log('a user connected');
});

io.use(function(socket, next){
  console.log('use socket',socket.handshake.headers);
  next()
})

server.listen(app.get('port'),function(){
  console.log('Express server listening on port '+ app.get('port'))
})


