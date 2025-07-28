const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./Connection');
const router = require('./route');

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

// ✅ CORS Configuration
const corsOptions = {
  origin: 'https://helpinghands21.vercel.app', // ✅ Replace with your actual frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, // ✅ Allow cookies/auth headers if needed
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// ✅ Preflight handler for all OPTIONS requests
app.options('*', cors(corsOptions));

// ✅ JSON Middleware
app.use(express.json());

// ✅ Connect DB and Start Server
connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}...`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// ✅ Define Routes AFTER Middleware
app.use('/api', router);
