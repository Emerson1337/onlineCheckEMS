import { Request, Response } from "express";
import FoodTypeService from "../services/FoodTypeService";

class CreateFoodTypeController {
  async handleCreate(request: Request, response: Response) {
    const { name } = request.body;
    const foodTypeService = new FoodTypeService();
    const food = await foodTypeService.create(name);

    return response.status(200).json(food);
  }

  async handleListAllTags(request: Request, response: Response) {
    const foodTypeService = new FoodTypeService();

    const tags = await foodTypeService.listAllTags();

    return response.status(200).json(tags);
  }

  async handleRemoveTag(request: Request, response: Response) {
    const { name } = request.params;
    const foodTypeService = new FoodTypeService();
    const result = await foodTypeService.removeTag(name);

    return response.status(200).json(result);
  }

  async handleEditTag(request: Request, response: Response) {
    const { name } = request.body;
    const { tagToEdit } = request.params;
    const foodTypeService = new FoodTypeService();

    const tag = await foodTypeService.editTag(tagToEdit, name);

    return response.status(200).json(tag);
  }
}


export { CreateFoodTypeController };