const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


//Function for token generation
const generateToken = (userData) => {
    console.log(userData)
    return jwt.sign(userData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
}

router.post('/', async (req, res) => {
    console.log('hit')
    const accessToken = generateToken(req.body);

    res.json({
        accessToken
    })
});


module.exports = router;