const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { postAJob, getAllJob, filter, applyJob, bookmarkedJobs, hiddenJobs } = require('../controller/jobController');
const decodeToken = require('../utilities/decodeToken');
const verifyJWT = require('../utilities/verifyJWT');




// Get all job
router.get('/', decodeToken, getAllJob);

//Post a new job
router.post('/postJob', verifyJWT, postAJob);

//Filter Job
router.post('/filter', decodeToken, filter);

//apply to a job
router.post('/apply/:id', decodeToken, applyJob);

//Load hidden Job
router.get('/hidden', verifyJWT, hiddenJobs);

//Load Bookmarked Job
router.get('/bookmarked', verifyJWT, bookmarkedJobs);





module.exports = router;
