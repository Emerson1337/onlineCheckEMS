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
      return new Error("Email/Nome inválido!")
    }


    if (name.length <= 0) {
      return new Error("Nome curto demais!")
    }

    for (let i = 0; i < specialCharacters.length; i++) {
      if (name.indexOf(specialCharacters[i]) != -1) {
        return new Error("Nome inválido!")
      }
    }

    if (password.length < 8) {
      return new Error("Senha curta demais!")
    }

    if (!regex.test(password)) {
      return new Error("Senha inválida! Insira pelo menos um número.")
    }

    if (userAlreadyExists) {
      return new Error('Esse endereço de e-mail já foi cadastrado!');
    }

    const passwordEncrypted = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: passwordEncrypted,
    });

    try {
      await userRepository.save(user);
    } catch (err: any) {
      const error = new Error(err);
      return new Error(error.message);
    }

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
      throw new Error("E-mail inválido!")
    }

    const usersRepository = getCustomRepository(UsersRepository);
    const userExists = await usersRepository.findOne({ email });

    if (!userExists) {
      throw new Error("E-mail/senha incorreto!")
    }

    const passwordMatch = await compare(password, userExists.password);

    if (!passwordMatch) {
      throw new Error("E-mail/senha incorreto!")
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