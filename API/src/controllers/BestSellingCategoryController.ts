import { Request, Response } from 'express';
import BestSellingCategoryService from '../services/BestSellingCategoryService';

class BestSellingCategoryController {

  // constructor() {
  //   setInterval(() => {
  //     this.calculateBestSellingCategory();
  //   }, 3000);
  // }

  async calculateBestSellingCategory(request: Request, response: Response) {
    const bestSellingCategoryService = new BestSellingCategoryService();

    await bestSellingCategoryService.storeBestCategory();

    return response.json({ "success": "success!" });
  }

}

export default BestSellingCategoryController;