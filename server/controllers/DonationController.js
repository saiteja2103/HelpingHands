const Donation = require('../models/Donation');

const createDonation = async (req, res) => {
  const { title, description, image, goalAmount, raisedAmount, donator } = req.body;

  try {
    const newDonation = new Donation({
      title,
      description,
      image,
      goalAmount,
      raisedAmount,
      donator,
    });

    await newDonation.save();

    res.json({ success: true, donation: newDonation });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find();
    // console.log(donations);
    res.json(donations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { createDonation, getAllDonations };