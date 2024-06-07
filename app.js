require('dotenv').config();

const express = require("express")
const bodyParser = require("body-parser")
const nodemailer = require("nodemailer")
const path = require("path")
const cors = require("cors")
const app = express()
app.use(express.static(path.resolve(__dirname, 'build')))
app.use(bodyParser.json())
app.use(cors()); // Enable CORS for all routes
const port = 8080;

app.post("/send-mail", async (req, res) => {
    const { from, subject, message } = req.body;
    console.log(from, subject, message)
    // Set up the transporter using your email service
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, 
      auth: {
        user: "senabhinav542@gmail.com",
        pass: "foclwkgslssrcyto"
      }
    });
  
    const mailOptions = {
      from,
      replyTo: from,
      to: 'senabhinav542@gmail.com', // The recipient email address
      subject,
      text: message
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent:', info.response);
        res.status(200).send('Email sent successfully');
      }
    });
})

app.listen(8082, (req, res) => {
    console.log("Server is listening on port " + 8082)
})