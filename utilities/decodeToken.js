const jwt = require('jsonwebtoken');
async function decodeToken(req, res, next) {
    authHeader = req?.headers.authorization;
    if (!authHeader) {
        next();
        return null
    }
    else {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
            // err
            if (err) {
                next();
                return err.message
            }
            else {
                req.decoded = decoded;
                next();
                return;
            }
        });
    }
}
module.exports = decodeToken