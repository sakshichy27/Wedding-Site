const { body, validationResult } = require('express-validator');
const RSVP = require('../models/RSVP');

exports.validate = () => [
  body('name').isLength({ min: 1 }).withMessage('Name is required').trim().escape(),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('phone').optional().trim().escape(),
  body('guestsCount').optional().isInt({ min: 1 }).toInt(),
  body('eventsAttending').isArray().optional(),
  body('message').optional().trim().escape(),
];

exports.createRSVP = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const rsvp = new RSVP({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      guestsCount: req.body.guestsCount || 1,
      eventsAttending: req.body.eventsAttending || [],
      message: req.body.message,
    });

    const saved = await rsvp.save();
    res.status(201).json({ message: 'RSVP saved', rsvp: saved });
  } catch (err) {
    next(err);
  }
};
