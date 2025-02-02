const mongoose = require('mongoose');

const DonationHistorySchema = new mongoose.Schema({
  donator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donator',
    required: true
  },
  donationId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  message: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const DonationHistory = mongoose.model('DonationHistory', DonationHistorySchema);

module.exports = DonationHistory;
