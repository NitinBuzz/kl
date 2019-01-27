const mongoose = require("mongoose");
var express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
var moment = require("moment");

const bodyParser = require('body-parser');

var app = express();
const router = express.Router();
router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

app.use(router);

app.use(bodyParser.json());
const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", socket => {
  console.log("New client connected"), setInterval(
    () => getApiAndEmit(socket),
    2000
  );
  socket.on("disconnect", () => console.log("Client disconnected"));
});

const getApiAndEmit = socket => {
  socket.emit("FromAPI", 33);
};

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));