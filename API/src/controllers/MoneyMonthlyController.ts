import { Request, Response } from 'express';
import MoneyMonthlyService from '../services/MoneyMonthlyService';

class MoneyMonthlyController {

  // constructor() {
  //   setInterval(() => {
  //     this.calculateBestSellingFood();
  //   }, 3000);
  // }

  async calculateMoneyMonthly(request: Request, response: Response) {
    const moneyMonthlyService = new MoneyMonthlyService();

    await moneyMonthlyService.storeMoneyMonthly();

    return response.json({ "success": "success!" });
  }

}

export default MoneyMonthlyController;