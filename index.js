
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

