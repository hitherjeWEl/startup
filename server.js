// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);

// Attach Socket.IO with proper CORS configuration
const io = socketIO(server, {
  cors: {
    origin: "*", // Allows connection from any website.
    methods: ["GET", "POST"]
  }
});

// Serve static files (like index.html, style.css) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Handle new connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // When a message is received, broadcast it to everyone
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Use the port provided by Render, or 3000 for local testing
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});