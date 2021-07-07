import { compare, hash } from 'bcrypt';
import { getCustomRepository } from "typeorm";
import UsersRepository from '../repositories/UsersRepository';
import { sign } from "jsonwebtoken";
import { check } from 'express-validator';
import * as yup from 'yup';

interface RequestDATA {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async create({ name, email, password }: RequestDATA) {
    const userRepository = getCustomRepository(UsersRepository);

    const userAlreadyExists = await userRepository.findOne({ email });
    const specialCharacters = '^!@#$%^&*()_+-=[]{};:|,.<>?]*$';
    const regex = /[0-9]/;

    let schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email(),
      password: yup.string().required(),
      createdOn: yup.date().default(function () {
        return new Date();
      }),
    });

    const credentialsTrue = await schema.isValid({ name, email, password });

    if (!credentialsTrue) {
      throw new Error("Email/Name invalid!")
    }


    if (name.length <= 0) {
      throw new Error("Name is too small!")
    }

    for (let i = 0; i < specialCharacters.length; i++) {
      if (name.indexOf(specialCharacters[i]) != -1) {
        throw new Error("Name is invalid!")
      }
    }

    if (password.length < 8) {
      throw new Error("Password is too small!")
    }

    if (!regex.test(password)) {
      throw new Error("Password is invalid! Please insert at least one number.")
    }

    if (userAlreadyExists) {
      throw new Error('Email adress already exists!');
    }

    const passwordEncrypted = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: passwordEncrypted,
    });

    await userRepository.save(user);

    return user;
  }

  public async login(email: string, password: string) {

    let schema = yup.object().shape({
      email: yup.string().email(),
      password: yup.string().required(),
      createdOn: yup.date().default(function () {
        return new Date();
      }),
    });

    const credentialsTrue = await schema.isValid({ email, password });
    if (!credentialsTrue) {
      throw new Error("Email invalid!")
    }

    const usersRepository = getCustomRepository(UsersRepository);
    const userExists = await usersRepository.findOne({ email });

    if (!userExists) {
      throw new Error("Email/password incorrect!")
    }

    const passwordMatch = await compare(password, userExists.password);

    if (!passwordMatch) {
      throw new Error("Email/password incorrect!")
    }

    const TOKEN_ASSIGN = String(process.env.TOKEN_ASSIGN);

    const token = sign({
      id: userExists.id,
    }, TOKEN_ASSIGN, {
      subject: userExists.id,
      expiresIn: "1d"
    })

    return token;
  }
}

export default CreateUserService;