import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import {OAuth2Client} from 'google-auth-library';
import dotenv from 'dotenv';

import usersRouter from './routes/User.route.js'

const app = express();
dotenv.config();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies
app.use(morgan('combined')); // Request logging (use 'dev' for concise logs)

// Routes
// const userRoutes = require('./routes/userRoutes');
// app.use('/api/users', userRoutes);

// Error handling middleware
// app.use((req, res, next) => {
//   const error = new Error('Not found');
//   error.status = 404;
//   next(error);
// });

// app.use((error, req, res, next) => {
//   res.status(error.status || 500);
//   res.json({
//     error: {
//       message: error.message,
//     },
//   });
// });

app.post('/auth/google', async (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
  res.header('Referrer-Policy', 'no-referrer-when-downgrade');
  const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'postmessage',
  );

  const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
  await oAuth2Client.setCredentials(tokens);
  const user = oAuth2Client.credentials;
console.log(user)
  
  return res.json(user);
});

app.use('/', usersRouter);

app.get('/', (req, res) => {
  res.json('Hello, world');
});

app.listen(3000, (req, res) => {
    console.log('Server is running on port 3000');
  });

export default app;
