const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Donator = require('../models/Donator');
const Donation = require('../models/Donation');
const DonationHistory = require('../models/DonationHistory');
require('dotenv').config();

const registerDonator = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if donator already exists
    const donatorExists = await Donator.findOne({ email });
    if (donatorExists) {
      return res.status(200).send({
        message: "Donator already exists",
        success: false,
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new donator
    const newDonator = new Donator({
      name,
      email,
      password: hashedPassword,
    });

    await newDonator.save();

    // Create JWT token
    const payload = {
      user: {
        id: newDonator.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.send({ success: true, token });
      }
    );
  } catch (error) {
    return res.send({ success: false, error });
  }
};
const loginDonator = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await Donator.findOne({ email });
      if (!user) {
        return res.json({ message: 'Invalid email' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.json({ message: 'Invalid password' });
      }
  
      const payload = {
        user: {
          id: user.id,
        },
      };
  
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          res.json({ success: true, token });
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  };
  const getDonator = async (req, res) => {
    try {
      const user = await Donator.findById(req.user.id).select('-password');
      const donations = await Donation.find({ donator: req.user.id });
      const donationhistories = await DonationHistory.find({ donator: req.user.id });
      res.json({ user, donations ,donationhistories});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  
  const updateDonator = async (req, res) => {
    const { name, email } = req.body;
  
    try {
      const user = await Donator.findById(req.user.id);
  
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      user.name = name || user.name;
      user.email = email || user.email;
  
      await user.save();
  
      res.json({ success: true, user });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  
  
module.exports =  {registerDonator,loginDonator,updateDonator,getDonator};