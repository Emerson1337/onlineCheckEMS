import { Request, Response } from 'express';
import RestaurantInfoService from '../services/RestaurantInfoService';

class RestaurantInfoController {

  async create(request: Request, response: Response) {
    try {
      const restaurantInfoService = new RestaurantInfoService();

      const { name, logo, phone_number, delivery_fee } = request.body;

      await restaurantInfoService.create({ name, logo, phone_number, delivery_fee });

      return response.status(200).json('Informações do restaurante adicionadas com sucesso!');
    } catch (err: any) {
      return response.status(500).json(err.message);
    }
  }

  async listInfo(request: Request, response: Response) {
    try {
      const restaurantInfoService = new RestaurantInfoService();

      const { id } = request.params;

      const restauranteInfo = await restaurantInfoService.listInfo(id);

      return response.status(200).json(restauranteInfo);
    } catch (err: any) {
      return response.status(500).json(err.message);
    }
  }

  async update(request: Request, response: Response) {
    try {
      const restaurantInfoService = new RestaurantInfoService();

      const { id } = request.params;
      const { name, logo, phone_number, delivery_fee } = request.body;

      await restaurantInfoService.update(id, { name, logo, phone_number, delivery_fee });

      return response.status(200).json('Informações do restaurante atualizadas com sucesso!');
    } catch (err: any) {
      return response.status(500).json(err.message);
    }
  }

}

export default RestaurantInfoController;