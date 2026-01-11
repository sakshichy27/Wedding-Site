require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const connectDB = require('./config.db');

const rsvpRoutes = require('./routes/rsvpRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// Basic security
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS - allow frontend only
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5500';
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

// Rate limiter for write endpoints
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60,
});
app.use('/api/', apiLimiter);

// Connect DB
connectDB(process.env.MONGO_URI);

// Routes
app.use('/api/rsvp', rsvpRoutes);
app.use('/api/contact', contactRoutes);

// Basic health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
