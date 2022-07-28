const express = require('express');
const cors = require('cors');
require('dotenv').config();
const userRoute = require('./routes/user.js');
const developerRoute = require('./routes/featuredDeveloper.js');
const countryCode = require('./routes/countryCode.js');
const { chats } = require('./data/data.js');

const app = express();
const port = process.env.PORT || 5000;

//middle wire
app.use(cors());
app.use(express.json());

// Connect Database with mongoose
require('./db');

app.use('/user', userRoute);
app.use('/developer', developerRoute);
app.use('/country', countryCode);

app.get('/', async (req, res) => {
  res.json({ message: 'Server Running' });
});

//soket.io implement--- sourav

app.get('/api/chat', async (req, res) => {
  res.send(chats);
});
app.get('/api/chat/:id', async (req, res) => {
  const singleChat = chats.find((c) => c._id === req.params.id);
  res.send(singleChat);
});



app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
