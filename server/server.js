const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./Connection');
const router = require('./route');
dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

// ✅ Set CORS before everything else
const corsOptions = {
  origin: '*', // Change to 'https://yourfrontend.vercel.app' if needed
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // ✅ Handle OPTIONS requests

// ✅ JSON Middleware
app.use(express.json());

// ✅ Database Connection
try {
  connectDB(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`Server started on port ${port}...`);
  });
} catch (err) {
  console.error("Error:", err);
}

// ✅ Define Routes AFTER Middleware
app.use('/api', router);
