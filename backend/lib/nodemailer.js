'use strict'

const nodemailer = require('nodemailer');


const transport = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_SERVICE_USER,
      pass: process.env.EMAIL_SERVICE_PASS
     
    }
  
});




module.exports = transport;

