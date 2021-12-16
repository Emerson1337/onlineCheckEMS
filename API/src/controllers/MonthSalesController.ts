import { Request, Response } from 'express';
import MonthSalesService from '../services/MonthSalesService';

class MonthSalesController {

  async insertNewSale(request: Request, response: Response) {
    try {
      const { name, tagFood, description, price } = request.body;

      const monthSalesService = new MonthSalesService();
      const monthSale = await monthSalesService.addNewMonthSale({ name, tagFood, description, price });

      return response.status(200).json(monthSale);
    } catch (err: any) {
      return response.status(403).json(err.message);
    }
  }

  async clearTable() {
    try {
      const monthSalesService = new MonthSalesService();

      const deleted = await monthSalesService.deleteAllData();
      return deleted;
    } catch (err: any) {
      return console.log(err.message);
    }
  }

}

export default MonthSalesController;