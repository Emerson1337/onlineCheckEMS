import { getCustomRepository } from 'typeorm';
import FoodsRepository from '../repositories/FoodsRepository';
import FoodTypesRepository from '../repositories/FoodTypesRepository';
import * as yup from 'yup';

interface Request {
  name: string;
  price: number;
  foodType: string;
  description: string;
}

class FoodService {
  public async create({ name, price, foodType, description }: Request) {
    const foodsRepository = getCustomRepository(FoodsRepository)
    const foodsTypeRepository = getCustomRepository(FoodTypesRepository)

    let schema = yup.object().shape({
      name: yup.string().required(),
      price: yup.number().required(),
      description: yup.string().required(),
      createdOn: yup.date().default(function () {
        return new Date();
      }),
    });

    const credentialsTrue = await schema.isValid({ name, price, foodType, description });
    const specialCharacters = "/([~!@#$%^&*+=-[],,/{}|:<>?])";

    if (!credentialsTrue) {
      throw new Error("Não é permitido caracteres especiais em nenhum dos campos!");
    }

    for (let i = 0; i < specialCharacters.length; i++) {
      if (name.indexOf(specialCharacters[i]) != -1) {
        throw new Error("Nome inválido!");
      }
      if (description.indexOf(specialCharacters[i]) != -1) {
        throw new Error("Descrição inválida!");
      }
    }

    if (price <= 0) {
      throw new Error("Preço inválido!");
    }

    const foodTypeExists = foodsTypeRepository.findOne(foodType);

    if (!foodTypeExists) {
      throw new Error("Essa categoria não existe!");
    }

    const food = foodsRepository.create({ name, price, foodType, description });

    try {
      await foodsRepository.save(food);
    } catch (err: any) {
      const error = new Error(err);
      throw new Error(error.message);
    }

    return food;
  }

  public async editFood(nameEdit: string, { name, price, foodType, description }: Request) {
    const foodRepository = getCustomRepository(FoodsRepository);

    let food = await foodRepository.findOne({ where: { name: nameEdit } });

    if (!food) {
      throw new Error("Essa comida não existe!");
    }

    await foodRepository.update({ name: nameEdit }, {
      name,
      price,
      description,
      foodType
    });

    food = await foodRepository.findOne({ name });
    if (!food) {
      throw new Error("Comida não encontrada!");
    }
    return food;
  }

  public async removeFood(name: string) {
    const foodsRepository = getCustomRepository(FoodsRepository);

    const foods = await foodsRepository.findOne({ name });

    if (!foods) {
      throw new Error("Essa comida não existe!");
    }
    try {
      await foodsRepository.remove(foods);
    } catch (err: any) {
      const error = new Error(err);
      throw new Error(error.message);
    }
    return {
      message: "Comida removida com sucesso!"
    };
  }

  public async listAllFoods() {
    const foodsRepository = getCustomRepository(FoodsRepository);
    const foods = await foodsRepository.find();

    return foods;
  }
}

export default FoodService;