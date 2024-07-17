const express = require('express');
const expressWs = require('express-ws');
const WebSocket = require('ws');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
app.use(cors());
const { get } = expressWs(app);

// Connect to MongoDB Atlas
const mongoURI = "mongodb+srv://omkhandu2017:FUX4O5o4rbGyvXGI@pune.jzcjolf.mongodb.net/?retryWrites=true&w=majority&appName=pune";

mongoose
	.connect(mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connected to MongoDB Atlas");
	})
	.catch((error) => {
		console.error("Error connecting to MongoDB Atlas:", error);
	});

// Define a schema
const Schema = mongoose.Schema;
const HeartRateSchema = new Schema({
    value: Number,
    date: Date,
    });

// Compile the model
const HeartRate = mongoose.model('HeartRate', HeartRateSchema);

const clients = new Set();

// Regular HTTP route
app.get('/', (req, res) => {
  res.send('WebSocket server running');
});

// WebSocket endpoint with cors
app.ws('/', (ws, req) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        clients.add(ws);
        console.log(`Received message: ${message}`);
        broadcast(message);
        const data = JSON.parse(message);
        const heartRate = new HeartRate({
                value: data.heartRate,
                date: new Date(),
        });
        heartRate.save()
        // ws.send(message); // Echo message back to sender
    });

    ws.on('close', () => {
        clients.delete(ws);
        console.log('Client disconnected');
    });
});

// Enable CORS for WebSocket endpoint
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
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
