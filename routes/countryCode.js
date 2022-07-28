const express = require('express');
const { get } = require('../controller/countryCodeController');
const router = express.Router();

//post or create an user
router.get('/get', get);

module.exports = router;
