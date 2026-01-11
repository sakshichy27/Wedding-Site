const mongoose = require('mongoose');

const CONTACT_SCHEMA = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    message: { type: String, required: true, trim: true },
    originPage: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', CONTACT_SCHEMA);
