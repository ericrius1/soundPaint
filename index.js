var WebSocketServer = require("ws").Server
var http = require("http")
var express = require("express")
var app = express()
var port = process.env.PORT || 5000

app.use(express.static(__dirname + "/client"))

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)

var connected_clients = []; 
var wss = new WebSocketServer({server: server})
console.log("websocket server created")


wss.on("connection", function(ws) {
 var id = Math.random();
 connected_clients.forEach(function(client){
  client.send(JSON.stringify(id));
 })
 connected_clients.push(ws);
 ws.send(JSON.stringify(id));

  ws.on("message", function(event){
    console.log(event)
  });
  console.log("websocket connection open")

  ws.on("close", function() {
    connected_clients.splice(connected_clients.indexOf(ws, 1))
    console.log("websocket connection close")
    clearInterval(id);
  })
})
