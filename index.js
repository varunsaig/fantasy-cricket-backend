
const express = require('express');
const app = express();
const PORT = 8080;

app.get('/', (req, res) => {
  res.send('Fantasy Cricket App Running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const app = express();
const PORT = 8080;

// Existing route
app.get('/', (req, res) => {
  res.send('Fantasy Cricket App Running');
});

// New feature route
app.get('/api/v1/new-feature', (req, res) => {
  res.json({ message: "New feature successfully added!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


