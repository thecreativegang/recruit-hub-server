const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


const { getAllResource, postAllResource, deleteResource, updateResource, getSearchResource } = require('../controller/resourceController');
const verifyJWT = require('../utilities/verifyJWT');

// const { create } = require('../controller/userController');


// get resource

router.get('/', getAllResource);

// get single search result

router.get('/search', verifyJWT, getSearchResource);

// post resource
router.post('/post', postAllResource);

// delete resource
router.post('/delete', deleteResource);

// update resource
router.post('/update', updateResource);


module.exports = router;
