const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


const { getAllResource, postAllResource, deleteResource, updateResource } = require('../controller/resourceController');

// const { create } = require('../controller/userController');

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

// get resource

router.get('/', getAllResource);

// post resource
router.post('/post', postAllResource);

// delete resource
router.post('/delete', deleteResource);

// update resource
router.post('/update', updateResource);


module.exports = router;