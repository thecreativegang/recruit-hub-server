const mongoose = require('mongoose');

const postJobSchema = mongoose.Schema({
    recruitersName: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    companySize: {
        type: String,
        required: true
    },
    vacancies: {
        type: Number,
        required: true
    },
    jobNature: {
        type: String,
        required: true
    },
    educationalQualification: {
        type: String,
        required: true
    },
    jobRequirements: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: true
    },
    applicationDeadline: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('PostJobSchema', postJobSchema);
