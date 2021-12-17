import { Request, Response } from 'express';
import BestSellingCategoryService from '../services/BestSellingCategoryService';

class BestSellingCategoryController {

  async calculateBestSellingCategory(request: Request, response: Response) {
    try {
      const bestSellingCategoryService = new BestSellingCategoryService();

      await bestSellingCategoryService.storeBestCategory();

      return response.status(200).json('success!');
    } catch (err: any) {
      return response.status(500).json(err.message);
    }
  }

}

export default BestSellingCategoryController;