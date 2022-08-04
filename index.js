const express = require('express');
const cors = require('cors');
require('dotenv').config();
const userRoute = require('./routes/user.js');
const chatRoute = require('./routes/chatRoute.js');
const developerRoute = require('./routes/featuredDeveloper.js');
const countryCode = require('./routes/countryCode.js');


const app = express();
const port = process.env.PORT || 3001;
const { Server } = require("socket.io");



//middle wire
app.use(cors());
app.use(express.json());

// Connect Database with mongoose
require('./db');

app.use('/user', userRoute);
app.use('/developer', developerRoute);
app.use('/country', countryCode);

// for chat 
app.use('/api/chat', chatRoute);


app.get('/', async (req, res) => {
  res.json({ message: 'Server Running' });
});





const server = app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});

/*
// soket code 
const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3002",
  },
})
io.on("connection", (socket) => {
  console.log("connected to socket.io")
  socket.on('setup', (userData) => {
    socket.join(userData._id);
  })
})
*/
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);


  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("Connected");
    console.log(`User with ID: ${socket.id} joined room: ${data}`);

    socket.on("join_room", (room) => {
      socket.join(room);
      console.log(`User with ID: ${socket.id} joined room: ${room}`);

    });

  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });


  socket.on("newMessage", (newMessageRecieved) => {
    let chat = newMessageRecieved.chat;
    if (!chat.user) return console.log("Chat.user not define")

    socket.in(user._id).emit("message received", newMessageRecieved);
    socket.to(data.room).emit("receive_message", data);
  });


  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });


});