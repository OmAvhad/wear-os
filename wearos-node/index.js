const WebSocket = require('ws');
const http = require('http');

const server = http.createServer((req, res) => {
res.writeHead(200, { 'Content-Type': 'text/plain' });
res.end('WebSocket server running');
});

const wss = new WebSocket.Server({ server });
const clients = new Set();

wss.on('connection', (ws) => {
console.log('Client connected');

ws.on('message', (message) => {
    clients.add(ws);
    console.log(`Received message: ${message}`);
    for (const client of clients) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(`${message}`);
        }
    }
    // ws.send(${message});
});

ws.on('close', () => {
    clients.delete(ws);
    console.log('Client disconnected');
});
});

const PORT = 8080; // Change to your desired port
server.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});