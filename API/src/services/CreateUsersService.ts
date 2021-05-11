import { hash } from 'bcrypt';
import { getCustomRepository, getRepository } from "typeorm";
import UsersRepository from '../repositories/UsersRepository';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request) {
    const userRepository = getCustomRepository(UsersRepository);

    const userAlreadyExists = await userRepository.findOne({ email });

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
}

export default CreateUserService;