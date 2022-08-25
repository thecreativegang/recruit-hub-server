const jwt = require('jsonwebtoken');

//JWT Verify
function verifyJWT(req, res, next) {
    // console.log('req.body', req.body)
    // console.log('req.headers', req.headers)
    authHeader = req?.headers?.authorization;
    // console.log(authHeader);
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

module.exports = verifyJWT