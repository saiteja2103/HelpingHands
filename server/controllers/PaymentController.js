const axios = require('axios');
const Donation = require('../models/Donation');
const DonationHistory = require('../models/DonationHistory');
const auth = require('../middleware/authMiddleware'); // Corrected import path

const processDonation = async (req, res) => {
  try {
    const { donationId, order_amount, donatorName, phone, message } = req.body;

    const orderId = "ORD" + Date.now();

    const options = {
      method: 'POST',
      url: 'https://sandbox.cashfree.com/pg/orders',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-api-version': '2023-08-01',
        'x-client-id': process.env.CASHFREE_APP_ID,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY,
      },
      data: {
        order_id: orderId,
        order_amount: order_amount,
        order_currency: "INR",
        customer_details: {
          customer_id: "CUS" + Date.now(),
          customer_name: donatorName,
          customer_email: req.body.email,
          customer_phone: phone,
        },
        order_meta: {
          return_url: `http://localhost:3000/payment-response?order_id=${orderId}`,
        },
      },
    };

    const response = await axios.request(options);
    const paymentSessionId = response.data.payment_session_id;

    res.status(200).send({
      success: true,
      payment_session_id: paymentSessionId,
      order_id: orderId,
    });
  } catch (error) {
    console.error("Error processing donation:", error.response ? error.response.data : error.message);
    res.status(500).send({
      success: false,
      message: error.response ? error.response.data.message : "Failed to process donation",
    });
  }
};

const newOrderId = async (req, res) => {
  try {
    const orderId = "ORD" + Date.now();

    const options = {
      method: 'POST',
      url: 'https://sandbox.cashfree.com/pg/orders',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-api-version': '2023-08-01',
        'x-client-id': process.env.CASHFREE_APP_ID,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY,
      },
      data: {
        customer_details: {
          customer_id: "CUS" + Date.now(),
          customer_phone: req.body.phone,
        },
        order_id: orderId,
        order_currency: "INR",
        order_amount: req.body.order_amount,
      },
    };

    const response = await axios.request(options);
    console.log(response.data.order_id);
    return res.status(200).send({
      payment_session_id: response.data.payment_session_id,
      order_id: orderId,
      token: req.body.token,
    });
  } catch (error) {
    console.error("Error processing order:", error.response ? error.response.data : error.message);
    return res.status(404).send({
      message: error.message,
      success: false,
    });
  }
};

const checkStatus = async (req, res) => {
  try {
    const order_id = req.params.order_id;
    const donationId = req.query.donationId; // Get donationId from query parameters
    const options = {
      method: 'GET',
      url: `https://sandbox.cashfree.com/pg/orders/${order_id}/payments`,
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-api-version': '2023-08-01',
        'x-client-id': process.env.CASHFREE_APP_ID,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY,
      },
    };

    const response = await axios.request(options);
    const paymentDetails = response.data[0]; // Assuming the response is an array with one object

    if (paymentDetails.payment_status === 'SUCCESS') {
      // Store the donation history in the database
      const donation = new Donation({donationId: donationId});
      const newDonationHistory = new DonationHistory({
        donator: req.user ? req.user.id : 'anonymous',
        donationId: donationId, // Use donationId from query parameters
        title: donation.title,
        amount: paymentDetails.order_amount,
        message: paymentDetails.payment_message,
      });

      await newDonationHistory.save();

      return res.status(200).send({
        success: true,
        message: "Payment successful and donation updated",
        orderDetails: paymentDetails
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "Payment not successful",
      });
    }
  } catch (error) {
    console.error("Error checking order status:", error.response ? error.response.data : error.message);
    return res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};

const updateRaisedAmount = async (req, res) => {
  try {
    const { donationId, amount } = req.body;
    const donation = await Donation.findById(donationId);
    if (donation) {
      donation.raisedAmount = (parseFloat(donation.raisedAmount) || 0) + parseFloat(amount);
      await donation.save();
      return res.status(200).send({
        success: true,
        message: "Raised amount updated successfully",
      });
    } else {
      return res.status(404).send({
        success: false,
        message: "Donation not found",
      });
    }
  } catch (error) {
    console.error("Error updating raised amount:", error.message);
    return res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};

module.exports = { processDonation, newOrderId, checkStatus, updateRaisedAmount };
