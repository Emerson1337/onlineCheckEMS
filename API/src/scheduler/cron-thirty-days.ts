import { CronJob } from 'cron';
import MonthSalesController from '../controllers/MonthSalesController';

import BestSellingCategoryService from '../services/BestSellingCategoryService';
import BestSellingFoodService from '../services/BestSellingFoodService';
import MoneyMonthlyService from '../services/MoneyMonthlyService';

const bestSellingCategoryService = new BestSellingCategoryService();
const bestSellingFoodService = new BestSellingFoodService();
const moneyMonthlyService = new MoneyMonthlyService();
const monthSalesController = new MonthSalesController();

// * * * * * *
// | | | | | |
// | | | | | day of week
// | | | | month
// | | | day of month
// | | hour
// | minute
// second ( optional )

const job = new CronJob('* * * * */2 *', () => {
    //ROUTINES
    bestSellingCategoryService.storeBestCategory();
    bestSellingFoodService.storeBestFood();
    moneyMonthlyService.storeMoneyMonthly();
    monthSalesController.clearTable();
}, null, true, 'America/Sao_Paulo');


export default job;
