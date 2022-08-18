

const express = require('express');
const router = express.Router();

const { getUserReview, postUserReview } = require('../controller/userRatingController');

router.get("/getreview/", getUserReview);
router.post("/postreview/", postUserReview);


module.exports = router;