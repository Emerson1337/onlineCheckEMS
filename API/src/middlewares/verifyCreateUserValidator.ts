
import { NextFunction, Request, Response } from "express";
import { body, check, validationResult } from "express-validator";

export default [
  body('name').notEmpty(),
  check('name', 'Name is not permit caracteres special')
    .matches(/^[\w&.\- ]+$/, 'i'),
  function verifyCreateUserValidator(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next()
  }
]
