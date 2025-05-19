const express = require('express');
const app = express();
const PORT = 3030;

// Middleware to serve static files (e.g., images)
app.use(express.static('public'));

// Homepage route with Virat Kohli image and welcome message
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Fantasy Cricket App</title></head>
      <body>
        <h1>Welcome to Fantasy Cricket App</h1>
        <img src="/virat-kohli.jpg" alt="Virat Kohli" style="width:300px;">
        <p>This is the homepage of the Fantasy Cricket App</p>
        <a href="/register">Go to Registration</a>
      </body>
    </html>
  `);
});

// Registration page route
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

// Handle registration form submission
app.post('/submit-registration', express.urlencoded({ extended: true }), (req, res) => {
  const { username, email, password } = req.body;
  console.log(`Registration Details - Username: ${username}, Email: ${email}, Password: ${password}`);

  // Acknowledge registration
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

// Serve Virat Kohli image (make sure to place this image in the 'public' folder)
app.get('/virat-kohli.jpg', (req, res) => {
  res.sendFile(__dirname + '/public/virat-kohli.jpg');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.use(express.json());

let players = [];

// Health check
app.get('/', (req, res) => {
  res.send('Fantasy Cricket App Backend is running 🚀');
});

// Register a player
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
