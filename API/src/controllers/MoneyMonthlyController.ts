import { Request, response, Response } from 'express';
import MoneyMonthlyService from '../services/MoneyMonthlyService';

class MoneyMonthlyController {

  async calculateMoneyMonthly(request: Request, response: Response) {
    try {
      const moneyMonthlyService = new MoneyMonthlyService();
      await moneyMonthlyService.storeMoneyMonthly();

      return response.json({ "success": "success!" });
    } catch (err: any) {
      return response.status(403).json(err.message);
    }
  }

  async getMoneyMonthly(request: Request, response: Response) {
    try {
      const moneyMonthlyService = new MoneyMonthlyService();
      var enterpriseId = response.locals.decodedToken.id;
      const moneyMonthly = await moneyMonthlyService.getMoneyMonthly(enterpriseId);

      return response.status(200).json({ "moneyMonthly": moneyMonthly });
    } catch (err: any) {
      return response.status(403).json(err.message);
    }
  }
}

export default MoneyMonthlyController;