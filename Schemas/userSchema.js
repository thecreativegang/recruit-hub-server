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
    default: '',
  },
  coverPhoto: {
    type: String,
    default: ''
  },
  profilePhoto: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  },
  country: {
    type: String,
    default: ''
  },
  state: {
    type: String,
    default: ''
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
      default: ''

    },
    phone: {
      type: String,
      default: ''

    },
  },
  socialLink: {
    github: {
      type: String,
      default: ''

    },
    linkdin: {
      type: String,
      default: ''

    },
    facebook: {
      type: String,
      default: ''

    },
    instagram: {
      type: String,
      default: ''

    },
  },

  featured: {
    type: Array,
  },
  skills: {
    type: Array,
  },
  experience: {
    type: Array,
  },
  courses: {
    type: Array,
  },
  projects: {
    type: Array,
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