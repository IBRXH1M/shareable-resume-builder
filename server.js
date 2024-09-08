// server.js
const express = require('express');
const cors = require('cors');
const app = express(); // Initialize the Express app

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON bodies

// Define routes
app.post('/create-resume', (req, res) => {
  // Handle resume creation logic here
  res.json({ resumeUrl: 'http://example.com/resume.pdf' });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
