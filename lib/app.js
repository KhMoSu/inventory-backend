const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

// Built in middleware
app.use(express.json());
app.use(cookieParser());
app.use(cookieParser());
app.use(
  cors({
    origin: ['https://lucky-pastelito-7a49d7.netlify.app/'],
    credentials: true,
  })
);

// App routes
app.use('/api/v1/items', require('./controllers/items'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
