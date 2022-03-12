import { compare, hash } from 'bcrypt';
import { getCustomRepository } from "typeorm";
import UsersRepository from '../repositories/UsersRepository';
import { sign } from "jsonwebtoken";
import { check } from 'express-validator';
import * as yup from 'yup';

interface RequestDATA {
  name: string;
  enterprise: string;
  phone_number: string,
  delivery_fee: number
  email: string;
  password: string;
}

class CreateUserService {
  public async create({ name, enterprise, phone_number, delivery_fee, email, password }: RequestDATA) {
    const userRepository = getCustomRepository(UsersRepository);

    const userAlreadyExists = await userRepository.findOne({ email });
    const specialCharacters = '^!@#$%^&*()_+-=[]{};:|,.<>?]*$';
    const regex = /[0-9]/;

    let schema = yup.object().shape({
      name: yup.string().required(),
      enterprise: yup.string().required('O nome da empresa é obrigatório.'),
      phone_number: yup.number().required('O campo número de telefone é obrigatório'),
      delivery_fee: yup.string().required('O campo taxa de entrega é obrigatório'),
      email: yup.string().email(),
      password: yup.string().required(),
      createdOn: yup.date().default(function () {
        return new Date();
      }),
    });

    await schema.validate({ name, enterprise, phone_number, delivery_fee, email, password }).catch(
      (error) => {
        throw new Error(error)
      }
    );

    if (name.length <= 0) {
      throw new Error("Nome curto demais!")
    }

    if (enterprise.length <= 0) {
      throw new Error("Nome do restaurante curto demais!")
    }

    const enterpriseAlreadyExists = await userRepository.findOne({ enterprise });

    if(enterpriseAlreadyExists) {
      throw new Error("Nome de restaurante já cadastrado!")
    }

    if (phone_number.length <= 0) {
      throw new Error("Número de telefone curto demais!")
    }

    if (delivery_fee < 0) {
      throw new Error("Taxa de entrega inválida!")
    }

    for (let i = 0; i < specialCharacters.length; i++) {
      if (name.indexOf(specialCharacters[i]) != -1) {
        throw new Error("Nome inválido!")
      }
    }

    for (let i = 0; i < specialCharacters.length; i++) {
      if (enterprise.indexOf(specialCharacters[i]) != -1) {
        throw new Error("Nome de empresa inválido!");
      }
    }

    if (password.length < 8) {
      throw new Error("Senha curta demais!")
    }

    if (!regex.test(password)) {
      throw new Error("Senha inválida! Insira pelo menos um número.")
    }

    if (userAlreadyExists) {
      throw new Error('Esse endereço de e-mail já foi cadastrado!');
    }

    const passwordEncrypted = await hash(password, 8);

    const user = userRepository.create({
      name,
      enterprise, 
      phone_number, 
      delivery_fee,
      email,
      password: passwordEncrypted,
    });

    try {
      await userRepository.save(user);
    } catch (err: any) {
      const error = new Error(err);
      throw new Error(error.message);
    }

    return user;
  }

  public async login(email: string, password: string) {

    let schema = yup.object().shape({
      email: yup.string().email(),
      password: yup.string().required(),
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