let express = require("express");
let socket = require("socket.io");

// app setup
let app = express();

// server setup
let server = app.listen(2000, () => {
  console.log("Project is running on localhost:2000");
});

// socket setup
let io = socket(server, {});
io.on("connection", (socket) => {
  // send data
  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });

  // check typing
  socket.on("typing", (name) => {
    socket.broadcast.emit("typing", name);
  });
});

// route setup
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
