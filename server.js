// server.js or main application file
require('dotenv').config();

const express = require('express');
const app = express();
const { getAuthUrl, getTokens, oauth2Client } = require('./auth/google');

// Define your routes and application logic using these functions

app.get('/auth/google', (req, res) => {
  const url = getAuthUrl();
  res.redirect(url);
});

app.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query;
  const tokens = await getTokens(code);
  // Store tokens in your database or use as needed
  res.send('Google OAuth2 successful');
});

// Start your server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
