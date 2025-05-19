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


//Match addition  starts from here 

app.use(express.json());

// Sample playing XI for LSG & SRH (simplified)
const matchData = {
  match: "LSG vs SRH - IPL 2025",
  teams: {
    LSG: [
      "KL Rahul", "Quinton de Kock", "Deepak Hooda", "Marcus Stoinis",
      "Rashid Khan", "Avesh Khan", "Mohsin Khan", "Manan Vohra",
      "Jason Holder", "Yash Thakur", "Kagiso Rabada"
    ],
    SRH: [
      "Aiden Markram", "Abhishek Sharma", "Rahul Tripathi", "Nicholas Pooran",
      "Washington Sundar", "Bhuvneshwar Kumar", "Umran Malik", "Kumar Kartikeya",
      "Harry Brook", "T Natarajan", "Wrap"
    ]
  }
};

// GET endpoint to fetch match and players
app.get('/match', (req, res) => {
  res.json(matchData);
});

// POST endpoint to submit user team
app.post('/team', (req, res) => {
  const selectedPlayers = req.body.players;
  if (!Array.isArray(selectedPlayers)) {
    return res.status(400).json({ error: "Players must be an array" });
  }
  if (selectedPlayers.length !== 11) {
    return res.status(400).json({ error: "You must select exactly 11 players" });
  }

  // Validate players exist in either team
  const allPlayers = [...matchData.teams.LSG, ...matchData.teams.SRH];
  for (let player of selectedPlayers) {
    if (!allPlayers.includes(player)) {
      return res.status(400).json({ error: `Invalid player selected: ${player}` });
    }
  }

  // Prepare team preview grouped by team
  const teamPreview = { LSG: [], SRH: [] };
  selectedPlayers.forEach(player => {
    if (matchData.teams.LSG.includes(player)) teamPreview.LSG.push(player);
    else if (matchData.teams.SRH.includes(player)) teamPreview.SRH.push(player);
  });

  res.json({
    message: "Team selection successful",
    teamPreview,
    totalPlayers: selectedPlayers.length
  });
});

// Start the server on port 3030 (or your existing port)
app.listen(3030, () => {
  console.log('Fantasy Cricket backend running on port 3030');
});
