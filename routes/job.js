const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const postJob = require('../controller/jobController')


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
                return res.status(403).send({ message: 'Forbiddendgfdf' });
            }
            else {
                req.decoded = decoded;
                next();
                return;
            }
        });
    }
}



//Check username is valid or not
// router.post('/postJob', postJob);



module.exports = router;
