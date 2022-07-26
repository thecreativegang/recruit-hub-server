const express = require('express');
const cors = require('cors');
require('dotenv').config();
const userRoute = require('./routes/user.js');
const developerRoute = require('./routes/featuredDeveloper.js');

const app = express();
const port = process.env.PORT || 5000;

//middle wire
app.use(cors());
app.use(express.json());

// Connect Database with mongoose
require('./db');

app.use('/user', userRoute);
app.use('/developer', developerRoute);

app.get('/', async (req, res) => {
  res.json({ message: 'Server Running' });
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
