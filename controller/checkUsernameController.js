const mongoose = require('mongoose');
const userSchema = require('../Schemas/userSchema');
const User = new mongoose.model("User", userSchema)

exports.checkUsername = async (req, res) => {

    const result = await User.find({ username: req.params.username })
    if (result.length === 0) {
        res.json({ isAvailable: true })
    }
    else {

        res.json({ isAvailable: false })
    }

};