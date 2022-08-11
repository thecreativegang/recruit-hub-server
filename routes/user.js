const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


const { checkUsername } = require('../controller/checkUsernameController');
const { create, get, updateUsername, getAllUsers, getSingleEmail, getSearchUser } = require('../controller/userController');

// const { create } = require('../controller/userController');
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
        return res.status(403).send({ message: 'Forbidden' });
      }
      else {
        req.decoded = decoded;
        next();
        return;
      }
    });
  }
}

// console.log('hello')

// get all search  users
router.get('/search-user', getSearchUser);

// get all users
router.get('/', getAllUsers)

//Check username is valid or not
router.post('/check-username/:username', checkUsername);

//Create new user
router.post('/create', create);

//get the user info
// router.post('/userInfo', getUserInfo);
router.get('/:email', verifyJWT, get);

//get single email by email  
router.get('/email/:email', getSingleEmail);



//add username if not any
router.post('/username', verifyJWT, updateUsername);



module.exports = router;
