const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    phone : {
        type : Number,
        required : true,
    },
    password: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: false,
  },
}, {timestamps : true})

const User = mongoose.model('User', userSchema);

module.exports = User;

