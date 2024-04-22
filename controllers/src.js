const nodemailer = require('nodemailer');
const Quote = require('../models/quote');

// Function to send email
async function sendEmail(quoteData) {
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'swatikkathiriya@gmail.com',
      pass: 'qckx zprv skhz dtxo',
    },
  });

  let mailOptions = {
    from: 'swatikkathiriya@gmail.com',
    to: quoteData.Email,
    subject: 'Request Sent',
    html: `
      <h1 style="text-align: center;">Thanks For Getting in Touch.</h1>
      <br>
      <p style="text-align: center;">Your request has been sent. We won't let you wait long for response.</p>
      <br>
      <div style="text-align: center;">
          <a href="info@dsnlogistics.com.au">
              <button style="border: 2px solid black;">Back to Site</button>
          </a>
      </div>
    `,
  };

  let info = await transporter.sendMail(mailOptions);
  console.log('Message sent: %s', info.messageId);
}

// Controller function to handle sending email
async function sendQuote(req, res) {
  try {
    const quoteData = req.body;

    // Validate the required fields
    if (
      !quoteData.FirstName ||
      !quoteData.LastName ||
      !quoteData.Email ||
      !quoteData.Phone ||
      !quoteData.WhatServiceDoYouRequire ||
      !quoteData.Descriptionofcargo
    ) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const quote = new Quote(quoteData);
    await quote.save();

    await sendEmail(quoteData);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
}

module.exports = { sendQuote };