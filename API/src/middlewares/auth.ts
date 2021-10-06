import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


export class Auth {
  async authMiddleware(request: Request, response: Response, next: NextFunction) {
    const token = request.headers.authorization;

    if (!token) {
      return response.status(403).send({
        error: "no token provide"
      })
    }

    const pass = String(process.env.TOKEN_ASSIGN);

    const parts = token.split(" ");

    const [scheme, tokenValid] = parts;

    jwt.verify(tokenValid, pass, (err, decoded) => {
      if (err) {
        return response.status(403).send({ error: 'token invalid!' });
      };

    })

    return next();
  }
}