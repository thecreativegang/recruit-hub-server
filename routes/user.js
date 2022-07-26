const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { create } = require('../controller/userController');

//Function for token generation
const generateToken = (userData) => {
  console.log(userData);
  return jwt.sign(userData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
};

router.post('/', async (req, res) => {
  console.log('hit');
  const accessToken = generateToken(req.body);

  res.json({
    accessToken,
  });
});
//Get all users
router.get('/', async (req, res) => {
  const users = await User.find({});
  res.send({
    users,
  });
});

//post or create an user
router.post('/', async (req, res) => {
  console.log('hit');
  const userDate = req.body;
  const accessToken = generateToken(userDate);
  User.insertOne();
  res.json({
    accessToken,
  });
});

router.post('/create', create);

module.exports = router;
