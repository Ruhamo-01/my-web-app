// index.js
const express = require('express');
const app = express();

// Home route
app.get('/', (req, res) => {
  res.send('Home Page');
});

// About route
app.get('/about', (req, res) => {
  res.send('About Page');
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

