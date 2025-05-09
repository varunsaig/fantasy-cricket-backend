const express = require('express');
const app = express();
const PORT = 8080;

app.get('/', (req, res) => {
  res.send('Fantasy Cricket App Running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

