const mongoose = require('mongoose');
const userSchema = require('../Schemas/userSchema');
const User = new mongoose.model("User", userSchema);

async function findUsername(email) {
    const res = await User.findOne({ email: email });
    const username = await res?.username;
    return username;


};
module.exports = findUsername