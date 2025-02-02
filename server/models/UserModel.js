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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization', 
    required: true,
  },
}, {timestamps : true})

const User = mongoose.model('User', userSchema);

module.exports = User;

