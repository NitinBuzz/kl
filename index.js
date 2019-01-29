const mongoose = require("mongoose");
var express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
var moment = require("moment");

const bodyParser = require('body-parser');

const con = mongoose.connect("mongodb://nin:react365@ds117965.mlab.com:17965/klu-messages", { useNewUrlParser: true });


var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({
  from: String,
  msg: String,
  room: String
});

var SomeModel = mongoose.model("chat", SomeModelSchema);

let pullDocs = (room) => {
  return new Promise((resolve, reject) => {
    var query = SomeModel.find({room: room });
    query.exec(function(err, docs) {
      resolve((docs || []));
    });
  });
};

var app = express();
app.use(bodyParser.json());
const router = express.Router();
router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});
router.post("/getRecords", function(req, res) {
  console.log(req.body);
  pullDocs(req.body.room).then(docs => {
    res.contentType("application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(docs);
  });
});


app.use(router);

app.use(bodyParser.json());
const server = http.createServer(app);
const io = socketIo(app);

io.on("connection", socket => {
  console.log("New client connected");
  
  socket.on('createMessage', (params) => {
    console.log(`createMessage ${params.room} ${params.from} ${params.msg}`);
    const chat = new SomeModel({
      room: params.room,
      from: params.from,
      msg: params.msg
      });
    chat.save(error => {
     io.to(params.room).emit('newMessage', {from: params.from , msg: params.msg});
      });
  });
  
    socket.on('join', (params) => {
      console.log(`joined ${params.name} and ${params.room}`);
    socket.join(params.room);
    setTimeout(() => {
        socket.emit(
        'newMessage',
        {from: 'Shas (Admin)', msg:`Welcome to ${params.room} Channel.`}
      );
     }, 800)

    socket.broadcast
      .to(params.room)
      .emit(
        'newMessage',
        {from: 'Admin', msg: `${params.name} has joined `}
      );
  });
  
  
  socket.on("disconnect", () => console.log("Client disconnected"));
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
   server.use((req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));