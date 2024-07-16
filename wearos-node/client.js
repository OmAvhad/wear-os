const net = require('net');

const PORT = 3000;
const HOST = '192.168.1.83';

const client = new net.Socket();

client.connect(PORT, HOST, () => {
  console.log('Connected to server.');

  // Listen for user input and send it to the server
  process.stdin.on('data', (data) => {
    const message = data.toString().trim();
    client.write(message);
  });
});

client.on('data', (data) => {
  console.log('Received data from server:', data.toString());
});

client.on('close', () => {
  console.log('Connection closed.');
});