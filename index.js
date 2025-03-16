require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 5001;

app.use(express.static('public'));


// Database connection setup
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API routes
app.get('/', (req, res) => {
    res.send('SWIMS Server is up and running!');
});

// Fetch inventory
app.get('/inventory', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM inventory');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add new inventory item
app.post('/inventory', async (req, res) => {
    const { part_name, quantity, min_threshold, max_threshold } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO inventory (part_name, quantity, min_threshold, max_threshold) VALUES ($1, $2, $3, $4) RETURNING *',
            [part_name, quantity, min_threshold, max_threshold]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start server
app.listen(port, () => {
    console.log(`SWIMS server running on port ${port}`);
});

const WebSocket = require('ws');

const wss = new WebSocket.Server({ server: app });

wss.on('connection', (ws) => {
    console.log('WebSocket connection established');
    ws.send('Welcome to SWIMS real-time updates!');
});

