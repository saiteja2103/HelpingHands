const express = require('express');
const { loginDonator, registerDonator, getDonator, updateDonator } = require('./controllers/DonatorController');
const { createDonation, getAllDonations } = require('./controllers/DonationController');
const { processDonation, newOrderId, checkStatus, updateRaisedAmount } = require('./controllers/PaymentController');
const auth = require('./middleware/authMiddleware');
const router = express.Router();

router.route('/auth/login').post(loginDonator);
router.route('/auth/register').post(registerDonator);
router.route('/donators/me').get(auth, getDonator);
router.route('/donators/me').put(auth, updateDonator);
router.route('/donations').post(auth, createDonation);
router.route('/donations').get(getAllDonations);
router.route('/donate').post(processDonation);
router.route('/payments').post(newOrderId); // Ensure this route is correctly defined
router.route('/payments/:order_id').get(auth, checkStatus);
router.route('/update-raised-amount').post(auth, updateRaisedAmount); // New route for updating raised amount

module.exports = router;