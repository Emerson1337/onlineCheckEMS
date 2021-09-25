import { Request, Response } from 'express';
import BestSellingFoodService from '../services/BestSellingFoodService';

class BestSellingFoodController {

  constructor() {
    setInterval(() => {
      this.calculateBestSellingFood();
    }, 2592000);
  }

  async calculateBestSellingFood() {
    try {
      const bestSellingFoodService = new BestSellingFoodService();

      await bestSellingFoodService.storeBestFood();

      return ({ "success": "success!" });
    } catch (err: any) {
      const error = new Error(err);

      return (error.message);
    }
  }

}

export default BestSellingFoodController;