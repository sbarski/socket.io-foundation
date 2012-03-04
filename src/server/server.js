var app = require('http').createServer(handler), 
    io = require('socket.io').listen(app), 
    fs = require('fs'),
    net = require('net')

app.listen(8080);

function handler (req, res) {
  var origin = (request.headers.origin || "*");

  fs.readFile(__dirname + '/index.html',

  function (err, data) {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin' : origin
      });
      return res.end('Error loading index.html');
    }

    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin' : origin
    });
    
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });

  socket.on('my other event', function (data) {
    console.log(data);
  });
});