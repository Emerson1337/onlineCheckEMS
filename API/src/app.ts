import express from 'express';
import routes from './routes/routes';
import { CronJob } from 'cron';
import cors from 'cors';

import BestSellingCategoryController from './controllers/BestSellingCategoryController'
import BestSellingFoodController from './controllers/BestSellingFoodController';
import MoneyMonthlyController from './controllers/MoneyMonthlyController';
import MonthSalesController from './controllers/MonthSalesController';

import './database';

const bestSellingCategoryController = new BestSellingCategoryController();
const bestSellingFoodController = new BestSellingFoodController();
const moneyMonthlyController = new MoneyMonthlyController();
const monthSalesController = new MonthSalesController();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();
app.use(cors())
app.use(express.json());
app.use(routes);

const job = new CronJob('0 0 0 31 * *', () => {
  //ROUTINES
  bestSellingCategoryController.calculateBestSellingCategory();
  bestSellingFoodController.calculateBestSellingFood();
  moneyMonthlyController.calculateMoneyMonthly();
  monthSalesController.clearTable();
}, null, true, 'America/Sao_Paulo');

export { app };
