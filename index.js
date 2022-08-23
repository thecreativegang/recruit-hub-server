const express = require('express');
const cors = require('cors');
require('dotenv').config();
const userRoute = require('./routes/user.js');
const userRating = require('./routes/userRatingRoute');
const messageRoute = require('./routes/messageRoute');
const developerRoute = require('./routes/featuredDeveloper.js');
const skillAssessment = require('./routes/skillAssessment');
const countryCode = require('./routes/countryCode.js');
const job = require('./routes/job');
const resource = require('./routes/resource');


const app = express();
const port = process.env.PORT || 3001;
const socket = require("socket.io")




//middle wire
app.use(cors({

  cors: {
    origin: ["http://localhost:3000", "https://recruit-hub-bbd21.web.app"],
    Credentials: true,

  }
}));
app.use(express.json());

// Connect Database with mongoose
require('./db');

app.use('/user', userRoute);
app.use('/review', userRating);
app.use('/developer', developerRoute);
app.use('/country', countryCode);
app.use('/skillassessment', skillAssessment);
app.use('/job', job);
app.use('/resource', resource);

// for chat addmsg
app.use("/messages", messageRoute);



app.get('/', async (req, res) => {
  res.json({ message: 'Server Running' });
});






const server = app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});


// for chat
const io = socket(server, {
  cors: {
    origin: ["http://localhost:3000", "https://recruit-hub-bbd21.web.app"],
    Credentials: true,

  },
});




io.on("connection", (socket) => {

  socket.on("send-msg", (msg) => {

    io.emit("msg-transfer", msg)
  })

  // socket.on("add-user", (userId) => {
  //   console.log(userId)
  //  user(userId, socket.id);
  // });

  // socket.on("send-msg", (data) => {
  //   console.log(data)
  //   if (data) {
  //     socket.to(data).emit("msg-recieve", data.msg);
  //   }
  // });

});





// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on("setup", (userData) => {
//     socket.join(userData._id);
//     socket.emit("Connected");
//     console.log(`U+ser with ID: ${socket.id} joined room: ${data}`);

//     socket.on("join_room", (room) => {
//       socket.join(room);
//       console.log(`User with ID: ${socket.id} joined room: ${room}`);

//     });

//   });

//   socket.on("send_message", (data) => {
//     socket.to(data.room).emit("receive_message", data);
//   });


//   socket.on("newMessage", (newMessageRecieved) => {
//     let chat = newMessageRecieved.chat;
//     if (!chat.user) return console.log("Chat.user not define")

//     socket.in(user._id).emit("message received", newMessageRecieved);
//     socket.to(data.room).emit("receive_message", data);
//   });



// });

