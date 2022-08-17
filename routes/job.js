const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { postAJob, getAllJob, filter } = require('../controller/jobController');
const decodeToken = require('../utilities/decodeToken');



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

// Get all job
router.get('/', getAllJob);

//Post a new job
router.post('/postJob', verifyJWT, postAJob);
router.post('/filter', decodeToken, filter);



module.exports = router;
