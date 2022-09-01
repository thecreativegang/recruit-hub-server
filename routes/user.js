const express = require('express');
const router = express.Router();

const { checkUsername } = require('../controller/checkUsernameController');
const {
  create,
  get,
  updateUsername,
  getAllUsers,
  getSingleEmail,
  getSearchUser,
  removeFromWishList,
  addToWishList,
  hideJob,
  removeFromHidden,
  getAdmin,
  getAllDeveloper,
  makeAdmin,
  removeAdmin,
  updateProfileInfo,
  getSingleDeveloper,
  updateSkillTestNumber,
} = require('../controller/userController');

// const { create } = require('../controller/userController');
const User = require('../Schemas/userSchema');
const decodeToken = require('../utilities/decodeToken');
const verifyJWT = require('../utilities/verifyJWT');

// console.log('hello')

// get all search  users
router.get('/search-user', verifyJWT, getSearchUser);

// get all users
router.get('/', verifyJWT, getAllUsers);

// ger all admin
router.get('/admin', verifyJWT, getAdmin);

// ger all developer
router.get('/developer', verifyJWT, getAllDeveloper);
// get developer by id
router.get('/developer/:id', verifyJWT, getSingleDeveloper);

// change developer admin status
router.put('/developer-admin/:id', makeAdmin);
router.put('/developer-admin-remove/:id', removeAdmin);

// update  developer profile
router.put('/user-profile/:id', updateProfileInfo);

// Edit skill assessment number
router.put('/skilltest-number/:email', updateSkillTestNumber);

//Check username is valid or not
router.post('/check-username/:username', checkUsername);

//Create new user
router.post('/create', create);

//get the user info
router.get('/all/:email', get);

//get single email by email
router.get('/email/:email', getSingleEmail);

//Get all wishlisted jobs
router.get('/wishList', addToWishList);

//add new job to wishlist
router.post('/wishList', verifyJWT, addToWishList);

//Add jobs to wishList
router.delete('/wishList', removeFromWishList);

//add username if not any
router.post('/username', verifyJWT, updateUsername);

// Hide a job
router.post('/hideJob/:id', verifyJWT, hideJob);

// Hide a job
router.post('/removeFromHidden/:id', verifyJWT, removeFromHidden);

module.exports = router;
