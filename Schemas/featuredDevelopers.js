const mongoose = require('mongoose');
const { format } = require('date-fns');
const crypto = require("crypto");

const featuredDeveloperSchema = mongoose.Schema({
    date: {
        type: String,
        default: format(new Date(), 'p')
    },
    name: {
        type: String,
        required: true
    },
    expertise: {
        type: String,
        required: true,
    },


})