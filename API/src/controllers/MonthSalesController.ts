import { Request, Response } from 'express';
import MonthSalesService from '../services/MonthSalesService';

class MonthSalesController {

  // constructor() {
  //   setInterval(() => {
  //     this.clearTable();
  //   }, 5000);
  // }

  async insertNewSale(request: Request, response: Response) {
    const { nameFood, tagFood, priceFood } = request.body;

    const monthSalesService = new MonthSalesService();

    const monthSale = await monthSalesService.addNewMonthSale({ nameFood, tagFood, priceFood });

    return response.status(200).json(monthSale);
  }

  async clearTable() {
    const monthSalesService = new MonthSalesService();

    const deleted = await monthSalesService.deleteAllData();
    return deleted;
  }

}

export default MonthSalesController;