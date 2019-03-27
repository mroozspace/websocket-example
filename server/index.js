const express = require('express')
const cors = require('cors')
const app = express()
const webSocket = require('express-ws')(app)
const port = 3000

app.use(cors())

app.use(function (req, res, next) {
  console.log('middleware');
  req.testing = 'testing';
  return next();
});

app.get('/', (req, res) => res.send('WebSocket demo server.'))

app.ws('/', function(webSocket, req) {
  webSocket.on('message', function(message) {
    console.log('received message: ', message);
    webSocket.send(`received: ${message}`)
  });
});
 
app.listen(port);