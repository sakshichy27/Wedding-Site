const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');

exports.validate = () => [
  body('name').isLength({ min: 1 }).withMessage('Name is required').trim().escape(),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('message').isLength({ min: 1 }).withMessage('Message is required').trim().escape(),
];

exports.createContact = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const contact = new Contact({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
      originPage: req.body.originPage || 'contact',
    });

    const saved = await contact.save();
    res.status(201).json({ message: 'Message received', contact: saved });
  } catch (err) {
    next(err);
  }
};
