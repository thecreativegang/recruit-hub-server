const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
    {
        message: {
            text: { type: String, required: true },
            type: String,
        },

        users: {
            text: { type: String, required: true },
            type: String,
        },

        // users: Array,
        sender: {
            type: String,
            ref: "User",
            required: true,
        },
    },
);

module.exports = mongoose.model("Messages", MessageSchema);