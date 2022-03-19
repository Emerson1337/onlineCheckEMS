import { Request, Response } from 'express';
import UserService from './services/UserService';

class UsersController {
  async createUser(request: Request, response: Response) {
    try {
      const { name, enterprise, phone_number, delivery_fee, email, password } = request.body;
      const createUser = new UserService();
      
      const user = await createUser.create({ name, enterprise, phone_number, delivery_fee, email, password });

      return response.json(user);
    } catch (err: any) {
      return response.status(403).json(err.message);
    }
  }

  async login(request: Request, response: Response) {
    try {
      const { email, password } = request.body;
      const createUser = new UserService();

      const token = await createUser.login(email, password);
      return response.json(token);
    } catch (err: any) {
      return response.status(403).json(err.message);
    }
  }
}

export default UsersController;