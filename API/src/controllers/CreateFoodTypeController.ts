import { Request, Response } from "express";
import FoodTypeService from "../services/FoodTypeService";

class CreateFoodTypeController {
  async handleCreate(request: Request, response: Response) {
    try {
      const { name } = request.body;
      const foodTypeService = new FoodTypeService();
      var enterpriseId = response.locals.decodedToken.id;

      const food = await foodTypeService.create(name, enterpriseId);

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
      const { enterprise } = request.params;

      const tags = await foodTypeService.listAllTags(enterprise);

      return response.status(200).json(tags);
    } catch (err: any) {
      return response.status(403).json(err.message);
    }
  }

  async handleRemoveTag(request: Request, response: Response) {
    try {
      const { id } = request.params;
      var enterpriseId = response.locals.decodedToken.id;
      
      const foodTypeService = new FoodTypeService();
      const result = await foodTypeService.removeTag(id, enterpriseId);
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
      var enterpriseId = response.locals.decodedToken.id;
      const foodTypeService = new FoodTypeService();
      const tagUpdated = await foodTypeService.editTag({ id, name }, enterpriseId);

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