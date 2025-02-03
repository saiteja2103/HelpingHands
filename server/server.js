const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./Connection');
const router = require('./route');
const path = require('path');
dotenv.config()

const port  = process.env.PORT || 5000 
const app = express()

app.use(express.json())
app.use(cors({ origin: '*' }));

// Serve static files from the /assets directory
// app.use('/assets', express.static(path.join(__dirname, 'assets')));

try {
  connectDB(process.env.MONGO_URL)
  app.listen(port, () => {
    console.log(`Server started on port ${port}...`)
  })
} catch (err) {
  console.log("Error")
}

app.use('/api', router)
