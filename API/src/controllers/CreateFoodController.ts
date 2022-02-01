import { Request, Response } from 'express';
import FoodService from '../services/FoodService';

class createFoodController {
  public async handleCreateFood(request: Request, response: Response) {
    try {
      const { name, image, price, tagFood, description } = request.body;
      const foodService = new FoodService();

      const food = await foodService.create({ name, image, price, tagFood, description });
      if (food) {
        return response.status(200).json("Comida criada com sucesso!");
      } else {
        throw new Error("Erro inesperado.");
      }
    } catch (err: any) {
      return response.status(500).json(err.message);
    }
  }

  public async handleListAllFoods(request: Request, response: Response) {
    try {
      const foodService = new FoodService();

      const foods = await foodService.listAllFoods();
      if (foods) {
        return response.status(200).json(foods);
      } else {
        throw new Error("Erro inesperado.");
      }
    } catch (err: any) {
      return response.status(500).json(err.message);
    }
  }

  public async handleRemoveFood(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const foodService = new FoodService();
      const result = await foodService.removeFood(id)
      if (result) {
        return response.status(200).json(`A comida 🍕 ${result.name} foi deletada com sucesso!`);
      } else {
        throw new Error("Erro inesperado.")
      }
    } catch (err: any) {
      return response.status(500).json(err.message);
    }
  }

  public async handleEditFood(request: Request, response: Response) {
    try {
      const { name, image, tagFood, description, price } = request.body;
      const { id } = request.params;
      const foodService = new FoodService();
      const food = await foodService.editFood(id, { name, image, price, tagFood, description });

      if (food) {
        return response.status(200).json("Comida editada com sucesso!");
      } else {
        throw new Error("Erro inesperado.");
      }
    } catch (err: any) {
      return response.status(500).json(err.message);
    }
  }

  async listByTag(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const foodTypeService = new FoodService();
      const foods = await foodTypeService.listByTag(id)

      return response.status(200).json(foods);
    } catch (err: any) {
      return response.status(500).json(err.message);
    }
  }

  public async listBestMonthSellingFoods(request: Request, response: Response) {
    try {
      const foodTypeService = new FoodService();
      const foods = await foodTypeService.listTop10Foods();

      return response.status(200).json(foods);
    } catch (err: any) {
      return response.status(500).json(err.message);
    }
  }
}

export default createFoodController;