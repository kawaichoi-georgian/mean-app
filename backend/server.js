require('dotenv').config()
const express = require('express');
const connectDB = require('./config/db');
const itemRoutes = require('./routes/itemRoutes');
const cors = require('cors');

const app = express();
app.use(express.json());


// ✅ Enable CORS for Angular frontend
app.use(cors({
  origin: 'http://localhost:4200',  // allow Angular dev server
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Routes
app.use('/api/items', itemRoutes);

const PORT = process.env.PORT || 5000;

// Connect to DB before starting server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch(err => {
  console.error("Server not started because DB connection failed.");
});
