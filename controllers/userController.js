const { MongoClient } = require('mongodb');

// Connection URI for MongoDB
const uri = 'mongodb://localhost:27017/TRIUMPH';

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB
async function connectToDatabase() {
    try {
        // Connect the client to the MongoDB server
        await client.connect();
        console.log('Connected to MongoDB.');

        // Once connected, you can perform database operations here

    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
}

// Call the connectToDatabase function to establish the connection
connectToDatabase();
