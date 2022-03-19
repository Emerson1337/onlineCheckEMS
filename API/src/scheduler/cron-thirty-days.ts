import { CronJob } from 'cron';
import MonthSalesController from '../useCases/MonthSales/MonthSalesController';

import BestSellingCategoryService from '../useCases/Categories/services/BestSellingCategoryService';
import BestSellingFoodService from '../useCases/Foods/services/BestSellingFoodService';
import MoneyMonthlyService from '../useCases/MonthSales/services/MoneyMonthlyService';

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

const job = new CronJob('0 1 0 1 */2 *', () => {
    //ROUTINES
    bestSellingCategoryService.storeBestCategory();
    bestSellingFoodService.storeBestFood();
    moneyMonthlyService.storeMoneyMonthly();
    monthSalesController.clearTable();
}, null, true, 'America/Sao_Paulo');


export default job;
