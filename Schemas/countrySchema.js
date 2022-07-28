const mongoose = require('mongoose');

const countryCodeShcema = mongoose.Schema({
  countries: {
    type: Array,
  },
});

module.exports = mongoose.model('CountryCode', countryCodeShcema);
