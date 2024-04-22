const Quote = require('../models/quote');
const nodemailer = require('nodemailer');

const createQuote = async (req, res) => {
  try {
    let {
      FirstName,
      LastName,
      Email,
      Phone,
      WhatServiceDoYouRequire,
      Descriptionofcargo,
    } = req.body;

    // Validate the required fields
    if (
      !FirstName ||
      !LastName ||
      !Email ||
      !Phone ||
      !WhatServiceDoYouRequire ||
      !Descriptionofcargo
    ) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newQuote = new Quote({
      FirstName,
      LastName,
      Email,
      Phone,
      WhatServiceDoYouRequire,
      Descriptionofcargo,
    });

    await newQuote.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'swatikkathiriya@gmail.com',
        pass: 'btie hxds yurg wmzu',
      },
    });

    const quoteDetailsTable = `
      <table border="1">
        <tr>
          <th>First Name</th>
          <td>${FirstName}</td>
        </tr>
        <tr>
          <th>Last Name</th>
          <td>${LastName}</td>
        </tr>
        <tr>
          <th>Email</th>
          <td>${Email}</td>
        </tr>
        <tr>
          <th>Phone</th>
          <td>${Phone}</td>
        </tr>
        <tr>
          <th>Service Required</th>
          <td>${WhatServiceDoYouRequire}</td>
        </tr>
        <tr>
          <th>Cargo Description</th>
          <td>${Descriptionofcargo}</td>
        </tr>
      </table>
    `;

    const mailOptions = {
      from: 'swatikkathiriya@gmail.com',
      to: `${Email}`,
      subject: 'Quote Created',
      html: `
        <p>Dear ${FirstName} ${LastName},</p>
        <p>Your quote has been created successfully.</p>
        ${quoteDetailsTable}
        <p>Thank you for choosing us.</p>
        <p>Best regards,</p>
        <p>Your Company</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    res
      .status(201)
      .json({ message: 'Quote created successfully', quote: newQuote });
  } catch (error) {
    console.error('Error creating quote:', error);
    res.status(500).json({ error: 'Failed to create quote' });
  }
};

module.exports = { createQuote };