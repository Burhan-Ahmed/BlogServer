const nodemail = require('nodemailer')

let transport = nodemail.createTransport(
    {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: "burhan.ahmed60090@gmail.com",
            pass: ""
        }
    }
)

module.exports = { transport }