const express = require('express');
const expressWs = require('express-ws');
const WebSocket = require('ws');

const app = express();
const { get } = expressWs(app);

const clients = new Set();

// Regular HTTP route
app.get('/', (req, res) => {
  res.send('WebSocket server running');
});

// WebSocket endpoint
app.ws('/', (ws, req) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    clients.add(ws);
    console.log(`Received message: ${message}`);
    broadcast(message);
    // ws.send(message); // Echo message back to sender
  });

  ws.on('close', () => {
    clients.delete(ws);
    console.log('Client disconnected');
  });
});

function broadcast(message) {
  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  }
}

const PORT = 8080; // Change to your desired port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
