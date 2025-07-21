const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require("./routes/auth.js");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check root route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Keep-alive ping route (your actual backend wake route)
app.get('/keep-alive', (req, res) => {
    res.status(200).send('OK');
});

// 🔐 API proxy to wake backend (this is the one wake.html will call)
app.get('/api/wake', async (req, res) => {
    try {
        // ⬇️ Replace with your real backend URL (that you want to wake)
        await fetch('https://your-backend.onrender.com/keep-alive');
        res.sendStatus(200);
    } catch (error) {
        console.error('Wake error:', error.message);
        res.sendStatus(500);
    }
});

app.use('/auth', authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

