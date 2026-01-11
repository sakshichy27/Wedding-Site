const mongoose = require('mongoose');

const RSVP_SCHEMA = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    guestsCount: { type: Number, default: 1, min: 1 },
    eventsAttending: [
      {
        type: String,
        enum: ['haldi', 'sangeet', 'wedding'],
      },
    ],
    message: { type: String, trim: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('RSVP', RSVP_SCHEMA);
