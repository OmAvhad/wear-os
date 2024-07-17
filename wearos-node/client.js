const net = require('net');
const express = require('express');

const TCP_PORT = 3000;
const HTTP_PORT = 3001;
const HOST = '192.168.1.83';

// TCP Client
const client = new net.Socket();

client.connect(TCP_PORT, HOST, () => {
  console.log('Connected to TCP server.');

  // Listen for user input and send it to the server
  process.stdin.on('data', (data) => {
    const message = data.toString().trim();
    client.write(message);
  });
});

client.on('data', (data) => {
  console.log('Received data from TCP server:', data.toString());
});

client.on('close', () => {
  console.log('TCP Connection closed.');
});

client.on('error', (err) => {
  console.error('TCP Connection error:', err.message);
  // Handle error (e.g., reconnect logic, exit)
});

// Express App
const app = express();

// Route to handle HTTP requests
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

// Start HTTP Server
app.listen(HTTP_PORT, HOST, () => {
  console.log(`Express server running at http://${HOST}:${HTTP_PORT}/`);
});
