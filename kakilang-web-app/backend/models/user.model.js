const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * This schema represents the login credentials of the user
 */
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

module.exports = User