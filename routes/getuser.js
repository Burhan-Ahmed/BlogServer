const express = require('express')
const router = express.Router()
const connection = require('../Database/sql')

router.get('/', (req, res) => {
    const query = 'SELECT * FROM reg'; // Adjust this query based on your needs
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data from database:', err);
            return res.status(500).json({ error: 'Database error', details: err.message });
        }

        res.json(results);
    });
});


module.exports = router