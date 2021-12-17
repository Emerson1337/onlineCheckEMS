import express from 'express';
import routes from './routes/routes';
import cors from 'cors';

import './database';
import job from './scheduler/cron-thirty-days';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

//starting cron-job
job.start();

const app = express();
app.use(cors())
app.use(express.json());
app.use(routes);

export { app };
