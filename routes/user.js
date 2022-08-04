const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


const { checkUsername } = require('../controller/checkUsernameController');
const { create, get, updateUsername } = require('../controller/userController');

const { create } = require('../controller/userController');
const User = require('../Schemas/userSchema');

//JWT Verify
function verifyJWT(req, res, next) {
  authHeader = req?.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: 'UnAuthorized Access' });
  }
  else {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
      // err
      if (err) {
        console.log(err)
        return res.status(403).send({ message: 'Forbiddendgfdf' });
      }
      else {
        req.decoded = decoded;
        next();
        return;
      }
    });
  }
}

router.post('/', async (req, res) => {
  console.log('hit');
  const accessToken = generateToken(req.body);

  res.json({
    accessToken,
  });
});
// 

//Get search users


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


//Check username is valid or not
router.post('/check-username/:username', checkUsername);

//Create new user
router.post('/create', create);

//get the user info
router.get('/:email', verifyJWT, get);


router.post('/username', verifyJWT, updateUsername);


module.exports = router;
