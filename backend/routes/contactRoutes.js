const express = require('express');
const router = express.Router();
const controller = require('../controllers/contactController');

// POST /api/contact
router.post('/', controller.validate(), controller.createContact);

module.exports = router;
