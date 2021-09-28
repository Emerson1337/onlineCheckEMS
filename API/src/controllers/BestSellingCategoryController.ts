import { Request, Response } from 'express';
import BestSellingCategoryService from '../services/BestSellingCategoryService';

class BestSellingCategoryController {

  async calculateBestSellingCategory() {
    try {
      const bestSellingCategoryService = new BestSellingCategoryService();

      const exito = await bestSellingCategoryService.storeBestCategory();

      return ({ "success": "success!" });
    } catch (err: any) {
      const error = new Error(err);
      return (error.message);
    }
  }

}

export default BestSellingCategoryController;