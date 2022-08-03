const mongoose = require('mongoose');

const postJobSchema = mongoose.Schema({
    jobTitle: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },

});

module.exports = mongoose.model('PostJobSchema', postJobSchema);
