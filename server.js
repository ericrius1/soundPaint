var WebSocketServer = require("ws").Server
var http = require("http");
var express = require("express");
var _ = require("underscore");
var app = express()
var port = process.env.PORT || 5000

app.use(express.static(__dirname + "/client"))

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)

var connected_clients = []; 
var wss = new WebSocketServer({server: server})
console.log("websocket server created")


var client_id = 0;

wss.on("connection", function(ws) {
  client_id++;  
  var client = {
    data: {
      type: "player_connected",
      relationship: 'me',
      client_id: client_id,
      position: {x: _.random(-500, 500), y: 2, z: _.random(-500, 500)},
    },
    socket_connection: ws
  }

  
  var message = client.data;

  ws.send(JSON.stringify(message));

  message.relationship = "other";
  connected_clients.forEach(function(client) {
    if(client.socket_connection.readyState != connected_clients[0].socket_connection.OPEN){
      console.log('Cant send, Client state is ', client.socket_connection.readyState)
    } else {
      client.socket_connection.send(JSON.stringify(message));
    }
  });
  connected_clients.push(client);


  ws.on("message", function(event){
    console.log(JSON.stringify(event))
  })


  ws.on("close", function() {
    connected_clients.splice(connected_clients.indexOf(client, 1))
    console.log("websocket connection close")
  })
})
