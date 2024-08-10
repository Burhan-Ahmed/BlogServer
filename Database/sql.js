const mysql = require('mysql'); // Correctly requiring the mysql module

const connection = mysql.createConnection({
    host: 'bdh0bdhvmqlpks8bprtp-mysql.services.clever-cloud.com',
    user: 'ui3o4vxzcfs2p1ht',
    password: 'FmA8WcCmRKLINeRu3dlS',
    database: 'bdh0bdhvmqlpks8bprtp',
    port: '3306'
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

module.exports = connection;
