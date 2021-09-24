import { Request, Response } from 'express';
import BestSellingFoodService from '../services/BestSellingFoodService';

class BestSellingFoodController {

  // constructor() {
  //   setInterval(() => {
  //     this.calculateBestSellingFood();
  //   }, 3000);
  // }

  async calculateBestSellingFood(request: Request, response: Response) {
    const bestSellingFoodService = new BestSellingFoodService();

    await bestSellingFoodService.storeBestFood();

    return response.json({ "success": "success!" });;
  }

}

export default BestSellingFoodController;