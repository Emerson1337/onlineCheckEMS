import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUsersService';

class CreateUsersController {
  async createUser(request: Request, response: Response) {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });

    return response.json(user);
  }
}

export default CreateUsersController;