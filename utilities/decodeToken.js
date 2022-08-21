const jwt = require('jsonwebtoken');
async function decodeToken(req, res, next) {
    authHeader = req?.headers.authorization;
    if (!authHeader) {
        console.log('Header not found')
        next();
        return null
    }
    else {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
            // err
            if (err) {
                console.log('err', err)
                next();
                return err.message
            }
            else {
                console.log('decoded', decoded)
                req.decoded = decoded;
                next();
                return;
            }
        });
    }
}
module.exports = decodeToken