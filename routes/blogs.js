const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { getAllBlogs, postAllBlogs, deleteBlogs, updateBlogs } = require('../controller/blogsControler');


// const { getAllResource, postAllResource, deleteResource, updateResource } = require('../controller/resourceController');

// const { create } = require('../controller/userController');



// get resource

router.get('/', getAllBlogs);

// post resource
router.post('/post', postAllBlogs);

// delete resource
router.post('/delete', deleteBlogs);

// update resource
router.post('/update', updateBlogs);


module.exports = router;
