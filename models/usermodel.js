const mongoose = require('mongoose');
const productmodel = require('./productmodel');

const userSchema = mongoose.Schema ({
    fullName: {
        type: String,
        minLength: 3,
        trim: true
    },
    email: String,
    password: String,
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: productmodel
    }],
    orders: {
        type: Array,
        default: []
    },
    contact: Number,
    picture: String,
});

module.exports = mongoose.model("user", userSchema);