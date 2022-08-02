const express = require('express');
const router = express.Router();
const { get } = require('../controller/skillAssessment');

//post or create an user
router.get('/test', get);

module.exports = router;
