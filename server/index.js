import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(morgan('combined')); // Request logging (use 'dev' for concise logs)

// Routes
// const userRoutes = require('./routes/userRoutes');
// app.use('/api/users', userRoutes);

// Error handling middleware
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });

export default app;
