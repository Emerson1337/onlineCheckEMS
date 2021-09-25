import { Request, Response } from 'express';
import FoodService from '../services/FoodService';

class createFoodController {
  async handleCreateFood(request: Request, response: Response) {
    try {
      const { name, price, foodType, description } = request.body;
      const foodService = new FoodService();

      const food = await foodService.create({ name, price, foodType, description });

      return response.json(food);
    } catch (err: any) {
      const error = new Error(err);
      return response.status(500).json(error.message);
    }
  }

  async handleListAllFoods(request: Request, response: Response) {
    try {
      const foodService = new FoodService();

      const foods = await foodService.listAllFoods();

      return response.status(200).json(foods);
    } catch (err: any) {
      const error = new Error(err);
      return response.status(500).json(error.message);
    }
  }

  async handleRemoveFood(request: Request, response: Response) {
    try {
      const { name } = request.params;
      const foodService = new FoodService();
      const result = await foodService.removeFood(name)
      return response.status(200).json(result);
    } catch (err: any) {
      const error = new Error(err);
      return response.status(500).json(error.message);
    }
  }

  async handleEditFood(request: Request, response: Response) {
    try {
      const { name, price, foodType, description } = request.body;
      const { nameToEdit } = request.params;
      const foodService = new FoodService();
      const food = await foodService.editFood(nameToEdit, { name, price, foodType, description });
      if (!food) {
        throw new Error("This food doesn't exist!");
      }
      return response.status(200).json(food);
    } catch (err: any) {
      const error = new Error(err);
      return response.status(500).json(error.message);
    }
  }
}

export default createFoodController;