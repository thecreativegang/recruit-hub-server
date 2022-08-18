const mongoose = require('mongoose');
const { format } = require('date-fns');

const UserRatingSchema = mongoose.Schema({
    rettingDate: {
        type: String,
        default: format(new Date(), 'PP'),
    },
    message: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required: true,
    },

});

module.exports = mongoose.model("Reviews", UserRatingSchema);