const jwt = require('jsonwebtoken');

//JWT Verify
function verifyJWT(req, res, next) {
    authHeader = req?.headers?.authorization;
    // console.log(authHeader);
    if (!authHeader) {
        return res.status(401).send({ message: 'UnAuthorized Access' });
    }
    else {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, '0e398bc317f57181ef5525900fe066dea8fcace125e2a1c161ee77bee701bf952c6b245924fcaf27b272afa61ea1934f351e207db0644d6497c6d911dea87488', function (err, decoded) {
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