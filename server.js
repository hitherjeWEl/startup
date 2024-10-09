// server.js

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

// Create an Express app
const app = express();

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Attach Socket.IO to the server
const io = socketIO(server);

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Listen for incoming connections from clients
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for chat messages from this socket
  socket.on('chat message', (msg) => {
    // Broadcast the message to all clients
    io.emit('chat message', msg);
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server on port 3000
server.listen(3000,'0.0.0.0', () => {
  console.log('Server is running on http://localhost:3000');
});
