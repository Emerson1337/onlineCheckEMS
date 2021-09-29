import { Request, Response } from 'express';
import MonthSalesService from '../services/MonthSalesService';

class MonthSalesController {

  async insertNewSale(request: Request, response: Response) {
    try {
      const { nameFood, tagFood, description, priceFood } = request.body;

      const monthSalesService = new MonthSalesService();
      const monthSale = await monthSalesService.addNewMonthSale({ nameFood, tagFood, description, priceFood });

      return response.status(200).json(monthSale);
    } catch (err: any) {
      const error = new Error(err);

      return response.status(500).json(error.message);
    }
  }

  async clearTable() {
    try {
      const monthSalesService = new MonthSalesService();

      const deleted = await monthSalesService.deleteAllData();
      return deleted;
    } catch (err: any) {
      const error = new Error(err);

      return console.log(error.message);
    }
  }

}

export default MonthSalesController;