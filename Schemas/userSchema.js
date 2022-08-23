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
  username: {
    type: String,
    default: ''
  },
  accountType: {
    type: String,
    enum: ['developer', 'recruiter'],
    default: ''
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  wishList: {
    type: Array,

  },
  hiddenJobs: {
    type: Array,

  },
  bookmarkedJobs: {
    type: Array,

  },
});

module.exports = userSchema;
