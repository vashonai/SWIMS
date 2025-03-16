require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 5001;

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
app.use(express.static('public'));

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Root Route
app.get('/', (req, res) => {
    res.send('SWIMS Server is up and running!');
});

// ===================== AUTHENTICATION ROUTES =====================

// Register a new user
app.post('/register', async (req, res) => {
    const { company_name, company_code, email, password } = req.body;
    
    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into database
        const result = await pool.query(
            `INSERT INTO users (company_name, company_code, email, password) 
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [company_name, company_code, email, hashedPassword]
        );

        res.status(201).json({ message: "Registration successful", user: result.rows[0] });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login Route
app.post('/login', async (req, res) => {
    const { company_code, password } = req.body;

    try {
        // Check if user exists
        const result = await pool.query(`SELECT * FROM users WHERE company_code = $1`, [company_code]);
        
        if (result.rows.length === 0) {
            return res.status(400).json({ error: "Invalid company code or password" });
        }

        const user = result.rows[0];

        // Compare password with stored hash
        const isValid = await bcrypt.compare(password, user.password);
        
        if (!isValid) {
            return res.status(400).json({ error: "Invalid company code or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ company_code: user.company_code }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: "Login successful", token });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ===================== INVENTORY ROUTES =====================

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
    const { name, description, quantity, price, supplier_id } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO inventory (name, description, quantity, price, supplier_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, description, quantity, price, supplier_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ===================== WEBSOCKET IMPLEMENTATION =====================
const WebSocket = require('ws');
const server = app.listen(port, () => {
    console.log(`SWIMS server running on port ${port}`);
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('WebSocket connection established');
    ws.send('Welcome to SWIMS real-time updates!');
});
