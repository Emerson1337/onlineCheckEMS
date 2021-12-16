import cron from 'node-cron';

import BestSellingCategoryController from '../controllers/BestSellingCategoryController'
import MonthSalesController from '../controllers/MonthSalesController';
import BestSellingFoodService from '../services/BestSellingFoodService';
import MoneyMonthlyService from '../services/MoneyMonthlyService';

const bestSellingCategoryController = new BestSellingCategoryController();
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

cron.schedule('0 1 * * * *', () => {
    //ROUTINES
    bestSellingCategoryController.calculateBestSellingCategory();
    bestSellingFoodService.storeBestFood();
    moneyMonthlyService.storeMoneyMonthly();
    monthSalesController.clearTable();
});
