const mongoose = require('mongoose');
const { format } = require('date-fns');

const resourceSchema = mongoose.Schema({
    registrationDate: {
        type: String,
        default: format(new Date(), 'PP'),
    },
    link: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,

    },
    topic: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true,
    });

module.exports = mongoose.model("resource", resourceSchema);

