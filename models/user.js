const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

const userShema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

userShema.plugin(uniquevalidator);

module.exports = mongoose.model('User', userShema);