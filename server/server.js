const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
// Ensure CORS is set up before defining your routes
app.use(cors());

// Optionally, you can explicitly allow specific origins:
app.use(cors({ origin: 'https://donation-fundraise-platform-badp.vercel.app' }));

try {
  connectDB(process.env.MONGO_URL)
  app.listen(port, () => {
    console.log(`Server started on port ${port}...`)
  })
} catch (err) {
  console.log("Error")
}
// Define your routes
app.use('/api', router);

// Optionally handle OPTIONS requests explicitly if needed:
app.options('*', cors());

module.exports = app;
