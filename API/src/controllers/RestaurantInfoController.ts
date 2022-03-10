import { Request, Response } from 'express';
import RestaurantInfoService from '../services/RestaurantInfoService';

class RestaurantInfoController {

  async create(request: Request, response: Response) {
    try {
      const restaurantInfoService = new RestaurantInfoService();

      const { enterprise, phone_number, delivery_fee } = request.body;

      var enterpriseId = response.locals.decodedToken.id;

      await restaurantInfoService.createOrUpdate({ enterprise, phone_number, delivery_fee }, enterpriseId);

      return response.status(200).json('Informações do restaurante adicionadas com sucesso!');
    } catch (err: any) {
      return response.status(500).json(err.message);
    }
  }

  async listInfo(request: Request, response: Response) {
    try {
      const restaurantInfoService = new RestaurantInfoService();

      var enterpriseId = response.locals.decodedToken.id;

      const restauranteInfo = await restaurantInfoService.listInfo(enterpriseId);

      return response.status(200).json(restauranteInfo);
    } catch (err: any) {
      return response.status(500).json(err.message);
    }
  }
}

export default RestaurantInfoController;