import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUsersService';

class CreateUsersController {
  async createUser(request: Request, response: Response) {
    try {
      const { name, enterprise, phone_number, delivery_fee, email, password } = request.body;
      const createUser = new CreateUserService();
      
      const user = await createUser.create({ name, enterprise, phone_number, delivery_fee, email, password });

      return response.json(user);
    } catch (err: any) {
      return response.status(403).json(err.message);
    }
  }

  async login(request: Request, response: Response) {
    try {
      const { email, password } = request.body;
      const createUser = new CreateUserService();

      const token = await createUser.login(email, password);
      return response.json(token);
    } catch (err: any) {
      return response.status(403).json(err.message);
    }
  }
}

export default CreateUsersController;