// index.js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Home Page');
});

// New route
app.get('/about', (req, res) => {
  res.send('About Page');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

