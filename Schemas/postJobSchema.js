const mongoose = require('mongoose');

const postJobSchema = mongoose.Schema({
    publishedDate: {
        type: String,
        required: true
    },
    publishedTime: {
        type: String,
        required: true
    },
    publisherUsername: {
        type: String,
        required: true
    },
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
        type: Array,
        required: true
    },
    applicationDeadline: {
        type: Object,
        required: true,
        deadlineDay: {
            type: String,
            require: true,
        },
        deadlineMonth: {
            type: String,
            require: true,
        },
        deadlineYear: {
            type: String,
            require: true,
        },
    },
    payRange: {
        type: Number,
        required: true
    },
    jobLocation: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Job', postJobSchema);
