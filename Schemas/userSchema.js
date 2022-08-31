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
  name: {
    type: String,
    default: '',
  },
  username: {
    type: String,
    default: '',
  },
  coverPhoto: {
    type: String,
    default: '',
  },
  profilePhoto: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    default: '',
  },
  country: {
    type: String,
    default: '',
  },
  state: {
    type: String,
    default: '',
  },
  accountType: {
    type: String,
    enum: ['developer', 'recruiter'],
    default: '',
  },
  assessmentTestNumber: {
    required: function () {
      return this.accountType === 'developer';
    },
    type: Number,
    default: 0,
  },

  contactsInfo: {
    email: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
  },
  socialLink: {
    github: {
      type: String,
      default: '',
    },
    linkdin: {
      type: String,
      default: '',
    },
    facebook: {
      type: String,
      default: '',
    },
    instagram: {
      type: String,
      default: '',
    },
  },

  skillTestMark: {
    type: Number,
    default: 0,
  },

  featured: {
    type: Array,
  },
  skills: Array,
  experience: Array,
  courses: Array,
  projects: Array,


  isAdmin: {
    type: Boolean,
    default: false,
  },
  wishList: Array,
  hiddenJobs: Array,
  bookmarkedJobs: Array,

});

module.exports = userSchema;
