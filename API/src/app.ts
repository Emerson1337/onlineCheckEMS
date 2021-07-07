import express from 'express';
import router from './routes/routes';

import './database';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();
app.use(express.json());
app.use(router);

export { app };
