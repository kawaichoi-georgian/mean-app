const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const itemRoutes = require('./routes/itemRoutes');
const cors = require('cors');

const app = express();
app.use(express.json());

// Serve static files from Angular's build directory (public folder)
const frontendPath = path.join(__dirname, 'public');
app.use(express.static(frontendPath));

// API routes
app.use('/api/items', itemRoutes);

// Catch-all route for Angular's routes (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Set up the port and API_URL dynamically using environment variables from Azure
const PORT = process.env.PORT || 5000;
const API_URL = process.env.API_URL || `http://localhost:${PORT}`;  // Default to localhost if not set

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on ${API_URL}`);
  });
}).catch(err => {
  console.error("Server not started due to DB connection error");
});
