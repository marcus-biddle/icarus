import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import {OAuth2Client} from 'google-auth-library';
import dotenv from 'dotenv';

import usersRouter from './routes/User.route.js';
import logsRouter from './routes/Log.route.js';
import EventRouter from './routes/Event.route.js';
import pointsRouter from './routes/ExperiencePoint.route.js';
import messageRouter from './routes/Message.route.js';
import leaderboardRouter from './routes/Leaderboard.route.js'
import { connectMongoDb } from './config/mongoDB.config.js';
import { credentials } from './middleware/credentials.js';
import { corsOptions } from './config/corsOptions.js';
import mongoose from 'mongoose';


dotenv.config();
connectMongoDb();

const app = express();
const PORT = 3001;

app.use(credentials);
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
// app.use('/api/users', userRoutes);

app.post('/auth/google', async (req, res) => {
  // res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  // res.header('Referrer-Policy', 'no-referrer-when-downgrade');
  const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'postmessage',
  );

  try {
    const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
    await oAuth2Client.setCredentials(tokens);
    const user = oAuth2Client.credentials;
    console.log('POST AUTH', user)
    
    return res.json(user);
  } catch (err) {
    console.log('Could not sign in', err)
  }
  
});

app.use('/', usersRouter);
app.use('/', logsRouter);
app.use('/', pointsRouter);
app.use('/', messageRouter);
app.use('/', EventRouter);
app.use('/', leaderboardRouter);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(PORT, () => {
    console.log(`Mongo Server is running on port ${PORT}`);
  });
})

mongoose.connection.on('error', err => {
  console.log(err);
})

app.get('/', (req, res) => {
  res.json('Hello, world');
});

app.listen(3000, (req, res) => {
    console.log('Server is running on port 3000');
  });

export default app;
