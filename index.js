const express = require('express');
const path = require('path');
const app = express();
const PORT = 3030;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // For serving static files like images

let players = [];

// Homepage with Virat Kohli image and Signup button
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Fantasy Cricket App</title></head>
      <body style="font-family: Arial; text-align: center;">
        <h1>Welcome to Fantasy Cricket App</h1>
        <img src="/virat-kohli.jpg" alt="Virat Kohli" style="width:300px;"><br><br>
        <p>This is the homepage of the Fantasy Cricket App</p>
        <a href="/register">
          <button style="padding: 10px 20px; font-size: 16px; cursor: pointer;">Signup</button>
        </a><br><br>
        <a href="/players">View Players</a>
      </body>
    </html>
  `);
});

// Registration page
app.get('/register', (req, res) => {
  res.send(`
    <html>
      <head><title>Registration</title></head>
      <body>
        <h1>Registration Page</h1>
        <form action="/submit-registration" method="POST">
          <label for="username">Username:</label>
          <input type="text" id="username" name="username" required><br><br>

          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required><br><br>

          <label for="password">Password:</label>
          <input type="password" id="password" name="password" required><br><br>

          <input type="submit" value="Register">
        </form>
      </body>
    </html>
  `);
});

// Registration handler
app.post('/submit-registration', (req, res) => {
  const { username, email, password } = req.body;
  console.log(`Registration Details - Username: ${username}, Email: ${email}, Password: ${password}`);

  res.send(`
    <html>
      <body>
        <h1>Registration Successful!</h1>
        <p>Welcome, ${username}! Your registration is successful.</p>
        <a href="/">Go to Homepage</a>
      </body>
    </html>
  `);
});

// Register player (API)
app.post('/register-player', (req, res) => {
  const { name, team } = req.body;
  if (!name || !team) {
    return res.status(400).json({ error: 'Name and team are required' });
  }
  const player = { id: players.length + 1, name, team };
  players.push(player);
  res.status(201).json(player);
});

// View all players
app.get('/players', (req, res) => {
  res.json(players);
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

app.get('/health', (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});
