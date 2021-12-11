import { Request, Response } from 'express';
import BestSellingFoodService from '../services/BestSellingFoodService';

class BestSellingFoodController {

  public async calculateBestSellingFood(request: Request, response: Response) {
    try {
      const bestSellingFoodService = new BestSellingFoodService();

      await bestSellingFoodService.storeBestFood();

      return response.status(200).json('success!');
    } catch (err: any) {
      return response.status(500).json(err.message);
    }
  }

  public async bestSoldFoods(request: Request, response: Response) {
    try {
      const bestSellingFoodService = new BestSellingFoodService();

      const foods = await bestSellingFoodService.bestSoldFoods();

      return response.status(200).json(foods);
    } catch (err: any) {
      return response.status(500).json(err.message);
    }
  }
}

export default BestSellingFoodController;