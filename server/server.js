// external dependencies
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

// Start http server
const http = require('http').Server(app);
http.listen(8080);

const io = require('socket.io')(http);


/******* CONFIG *******/
// Use body parser for requests
app.use(bodyParser.urlencoded({
  extended: true
}));
// Serve all files from static
app.use('/static', express.static(path.join(__dirname, '/static')));

const mongo = require('./models/wrapper.js');


var bobList = [];


function nowPlusXMinutes(numMinutes) {
  return new Date(Date.now + numMinutes*60000);
}


// Main board

// Define routes
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/templates/board.html');
});

// Send data to board
const controller = require('./routes/controllerRoutes');
app.get('/controller', controller.GETindex);
app.post('/controller', controller.POSTbob);
app.get('/flavors', controller.GETflavors);
app.get('/tags', controller.GETtags);

// Start socket
io.on('connection', function(socket){
  console.log("user connected");

  // if (msg === 'board') {
  console.log("sending all active bobs to board");
  mongo.getAllActiveBobs().then(function (bobList) {
    socket.emit('all_elements', bobList);
  });
  // }

  socket.on('add_element', function (msg) {
    socket.broadcast.emit('add_element', msg);

    mongo.saveBob(msg.data, msg.timeStart, msg.timeEnd, msg.flavor, msg.tags);
  });
});


console.log("FORWARDboard running on port 8080");
console.log("http://localhost:8080, http://localhost:8080/controller");
console.log();
