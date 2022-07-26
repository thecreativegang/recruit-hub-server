const mongoose = require('mongoose');
const { format } = require('date-fns');

const userSchema = mongoose.Schema({
  registrationDate: {
    type: String,
    default: format(new Date(), 'PP'),
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    unique: true,
  },
  accountType: {
    type: String,
    enum: ['developer', 'recruiter'],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('User', userSchema);
