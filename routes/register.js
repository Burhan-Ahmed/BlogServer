const express = require('express');
const multer = require('multer');
const router = express.Router()
const cors = require('cors');
//const { transport } = require('../nodemailer/autogenerateMail')
const mysql = require('mysql');


router.use(cors());

const connection = mysql.createConnection({
    host: 'bdh0bdhvmqlpks8bprtp-mysql.services.clever-cloud.com',
    user: 'ui3o4vxzcfs2p1ht',
    password: 'FmA8WcCmRKLINeRu3dlS',
    database: 'bdh0bdhvmqlpks8bprtp',
    port: '3306'
})

connection.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage: storage });


router.post('/', upload.single('img'), (req, res) => {
    const name = req.body.name;
    const city = req.body.city;
    const email = req.body.email;
    const description = req.body.descrip;
    const imagePath = req.file ? req.file.path : null;

    console.log(name, email, city, imagePath, description)

    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    //const mailoption = {
    //   from: `BLOG Site <burhan.ahmed60090@gmail.com>`,
    //    to: email,
    //    subject: 'Your Blog Has been Published',
    //    text: 'Your Blog Has been Published. Congratulations'
    //}

    // Insert data into the database

    const query = 'INSERT INTO reg (name, email, city, image, description) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [name, email, city, imagePath, description], (err, result) => {
        if (err) {
            console.error('Error inserting data into database:', err);
            return res.status(500).json({ error: 'Database error', details: err.message });
        }
        console.log('Data inserted:', result);
        res.send('Blog created successfully');
    });
});

module.exports = router