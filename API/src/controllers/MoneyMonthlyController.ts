import { Request, Response } from 'express';
import MoneyMonthlyService from '../services/MoneyMonthlyService';

class MoneyMonthlyController {

  constructor() {
    setInterval(() => {
      this.calculateMoneyMonthly();
    }, 2592000);
  }

  async calculateMoneyMonthly() {
    try {
      const moneyMonthlyService = new MoneyMonthlyService();
      await moneyMonthlyService.storeMoneyMonthly();

      return ({ "success": "success!" });
    } catch (err: any) {
      const error = new Error(err);

      return (error.message);
    }
  }

}

export default MoneyMonthlyController;