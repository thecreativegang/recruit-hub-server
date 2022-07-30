const User = require('../Schemas/userSchema');

exports.checkUsername = async (req, res) => {
    console.log(req.params.username)
    const result = await User.find({ userName: req.params.username })
    console.log(result)
    if (result.length === 0) {
        res.json({ isAvailable: true })
    }
    else {

        res.json({ isAvailable: false })
    }
    // 
};