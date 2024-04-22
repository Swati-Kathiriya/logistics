const express = require('express');
const router = express.Router();

const { createQuote } = require('../controllers/quote');
const { sendQuote } = require('../controllers/src');

// POST route for handling quote requests
router.post('/getquote', createQuote);
router.post('/quote', sendQuote);

module.exports = router;