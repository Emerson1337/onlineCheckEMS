import { Request, Response } from 'express';
import BestSellingFoodService from '../services/BestSellingFoodService';

class BestSellingFoodController {

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

  async topTenFoods() {
    try {
      const bestSellingFoodService = new BestSellingFoodService();

      const foods = bestSellingFoodService.topTenFoods();

      return foods;
    } catch (err: any) {
      const error = new Error(err);

      return (error.message);
    }
  }
}

export default BestSellingFoodController;