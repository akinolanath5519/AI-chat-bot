require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { handleChatRequest } = require('./controllers/chatController');
const { saveLead } = require('./controllers/leadController');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/chat', handleChatRequest);
app.post('/lead', saveLead);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
