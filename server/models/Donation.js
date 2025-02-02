const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  donator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donator',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  goalAmount: {
    type: Number,
    required: true
  },
  raisedAmount: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Donation = mongoose.model('Donations', DonationSchema);

module.exports = Donation;