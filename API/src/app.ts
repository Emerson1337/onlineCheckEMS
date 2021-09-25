import express from 'express';
import routes from './routes/routes';

import './database';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();
app.use(express.json());
app.use(routes);

export { app };
