const mongoose = require('mongoose');
const { format } = require('date-fns');

const blogsSchema = mongoose.Schema({
    uploadDate: {
        type: String,
        default: format(new Date(), 'PP'),
    },
    title: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },

},
    {
        timestamps: true,
    });

module.exports = mongoose.model("blogs", blogsSchema);

