import express from 'express';
import router from './routes/routes';

import './database';

const app = express();
app.use(express.json());
app.use(router);

export { app };
