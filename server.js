const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static assets with html extensions auto-resolution
app.use(express.static(__dirname, { extensions: ['html', 'htm'] }));

// Route handlers for clean URLs
app.get('/apps/papertrail/privacy', (req, res) => {
  res.sendFile(path.join(__dirname, 'apps', 'papertrail', 'privacy', 'index.html'));
});

app.get('/apps/papertrail/support', (req, res) => {
  res.sendFile(path.join(__dirname, 'apps', 'papertrail', 'support', 'index.html'));
});

app.get('/apps/papertrail', (req, res) => {
  res.sendFile(path.join(__dirname, 'apps', 'papertrail', 'index.html'));
});

app.get('/apps', (req, res) => {
  res.sendFile(path.join(__dirname, 'apps', 'index.html'));
});

// General fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`K2G LLC server running on port ${PORT}`);
});
