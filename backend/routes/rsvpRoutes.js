const express = require('express');
const router = express.Router();
const controller = require('../controllers/rsvpController');

// POST /api/rsvp
router.post('/', controller.validate(), controller.createRSVP);

// GET /api/rsvp/count -> public count
router.get('/count', async (req, res, next) => {
  try {
    const count = await require('../models/RSVP').countDocuments();
    res.json({ count });
  } catch (err) { next(err); }
});

module.exports = router;
