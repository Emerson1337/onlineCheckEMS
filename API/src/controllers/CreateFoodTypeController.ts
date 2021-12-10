import { Request, Response } from "express";
import FoodTypeService from "../services/FoodTypeService";

class CreateFoodTypeController {
  async handleCreate(request: Request, response: Response) {
    try {
      const { name } = request.body;
      const foodTypeService = new FoodTypeService();
      const food = await foodTypeService.create(name);
      if (food) {
        return response.status(200).json("Categoria criada com sucesso!");
      } else {
        throw new Error("Erro inesperado.");
      }
    } catch (err: any) {
      return response.status(500).json(err.message);
    }
  }

  async handleListAllTags(request: Request, response: Response) {
    try {
      const foodTypeService = new FoodTypeService();
      const tags = await foodTypeService.listAllTags();

      return response.status(200).json(tags);
    } catch (err: any) {
      const error = new Error(err);

      return response.status(500).json(error.message);
    }
  }

  async handleRemoveTag(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const foodTypeService = new FoodTypeService();
      const result = await foodTypeService.removeTag(id);
      if (result) {
        return response.status(200).json(`A categoria 🍕 ${result.name} foi deletada com sucesso!`);
      } else {
        throw new Error("Erro inesperado.")
      }
    } catch (err: any) {
      return response.status(500).json(err.message);
    }

  }

  async handleEditTag(request: Request, response: Response) {
    try {
      const { name } = request.body;
      const { id } = request.params;
      const foodTypeService = new FoodTypeService();
      const tagUpdated = await foodTypeService.editTag({ id, name });

      if (tagUpdated) {
        return response.status(200).json('Categoria editada com sucesso!');
      } else {
        throw new Error("Erro inesperado.")
      }
    } catch (err: any) {
      return response.status(500).json(err.message);
    }
  }

}


export { CreateFoodTypeController };