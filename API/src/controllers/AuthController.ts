import { json, Request, Response } from 'express';

class AuthController {

  async auth(request: Request, response: Response) {
    try {
      return response.status(200).json('Autenticado.');
    } catch (err: any) {
      const error = new Error(err);
      return (error.message);
    }
  }

}

export default AuthController;