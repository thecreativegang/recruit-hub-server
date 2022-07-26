const express = require('express');
const router = express.Router();
const { create } = require('../controller/featuredDevelopersController');

//post or create an user
router.post('/create', create);

module.exports = router;
