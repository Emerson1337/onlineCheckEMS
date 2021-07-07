import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUsersService';

class CreateUsersController {
  async createUser(request: Request, response: Response) {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();

    const user = await createUser.create({ name, email, password });

    return response.json(user);
  }

  async login(request: Request, response: Response) {
    const { email, password } = request.body;
    const createUser = new CreateUserService();

    const token = await createUser.login(email, password);
    return response.json(token);
  }
}

export default CreateUsersController;