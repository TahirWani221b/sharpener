// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// Create an Express app
const app = express();

// Set up body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route for '/login' to display the username input form
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

// Route for '/save-username' to save the username in localStorage
app.post('/save-username', (req, res) => {
    const username = req.body.username;
    // Save the username to the browser's local storage (you can use a library like 'localStorage' or 'node-localstorage' for server-side storage)
    // For simplicity, we'll store it in a file called 'users.txt'
    fs.writeFileSync('users.txt', username);
    res.redirect('/');
});

// Route for '/' to display the send message form and show previous messages
app.get('/', (req, res) => {
    const users = fs.existsSync('users.txt') ? fs.readFileSync('users.txt', 'utf8') : 'Anonymous';
    const username = users || 'Anonymous';
    // Read the messages from the file (or initialize it if it doesn't exist)
    const messages = fs.existsSync('messages.txt')
        ? fs.readFileSync('messages.txt', 'utf8').split('\n').filter(Boolean)
        : [];

    res.send(`
    <h1>Welcome, ${username}!</h1>
    <form action="/send-message" method="post">
      <input type="text" name="message" placeholder="Enter your message" />
      <button type="submit">Send</button>
    </form>
    <h2>Previous Messages:</h2>
    <ul>
      ${messages.map(msg => `<li>${msg}</li>`).join('')}
    </ul>
  `);
});

// Route for '/send-message' to store the message in a file
app.post('/send-message', (req, res) => {
    const users = fs.existsSync('users.txt') ? fs.readFileSync('users.txt', 'utf8') : 'Anonymous';
    const username = users || 'Anonymous';
    const message = req.body.message;

    // Read the existing messages from the file (or initialize it if it doesn't exist)
    const messages = fs.existsSync('messages.txt')
        ? fs.readFileSync('messages.txt', 'utf8').split('\n').filter(Boolean)
        : [];

    // Add the new message to the messages array
    messages.push(`${username}: ${message}`);

    // Write the updated messages back to the file
    fs.writeFileSync('messages.txt', messages.join('\n'));

    res.redirect('/');
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
