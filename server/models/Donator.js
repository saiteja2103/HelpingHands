const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const donator = new mongoose.Schema({
  name:{
    type:String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('donators',donator);