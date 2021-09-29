import { getCustomRepository } from 'typeorm';
import FoodsRepository from '../repositories/FoodsRepository';
import FoodTypesRepository from '../repositories/FoodTypesRepository';
import * as yup from 'yup';
import MonthSalesRespository from '../repositories/MonthSalesRepository';

interface Request {
  name: string;
  price: number;
  tagFood: string;
  description: string;
}

class FoodService {
  public async create({ name, price, tagFood, description }: Request) {
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

    const credentialsTrue = await schema.isValid({ name, price, tagFood, description });
    const specialCharacters = "/([~!@#$%^&*+=-[],,/{}|:<>?])";

    if (!credentialsTrue) {
      return new Error("Não é permitido caracteres especiais em nenhum dos campos!");
    }

    for (let i = 0; i < specialCharacters.length; i++) {
      if (name.indexOf(specialCharacters[i]) != -1) {
        return new Error("Nome inválido!");
      }
      if (description.indexOf(specialCharacters[i]) != -1) {
        return new Error("Descrição inválida!");
      }
    }

    if (price <= 0) {
      return new Error("Preço inválido!");
    }

    const foodTypeExists = foodsTypeRepository.findOne(tagFood);

    if (!foodTypeExists) {
      return new Error("Essa categoria não existe!");
    }

    const food = foodsRepository.create({ name, price, tagFood, description });

    try {
      await foodsRepository.save(food);
    } catch (err: any) {
      const error = new Error(err);
      return new Error(error.message);
    }

    return food;
  }

  public async editFood(nameEdit: string, { name, price, tagFood, description }: Request) {
    const foodRepository = getCustomRepository(FoodsRepository);

    let food = await foodRepository.findOne({ where: { name: nameEdit } });

    if (!food) {
      return new Error("Essa comida não existe!");
    }

    await foodRepository.update({ name: nameEdit }, {
      name,
      price,
      description,
      tagFood
    });

    food = await foodRepository.findOne({ name });
    if (!food) {
      return new Error("Comida não encontrada!");
    }
    return food;
  }

  public async removeFood(name: string) {
    const foodsRepository = getCustomRepository(FoodsRepository);

    const foods = await foodsRepository.findOne({ name });

    if (!foods) {
      return new Error("Essa comida não existe!");
    }
    try {
      await foodsRepository.remove(foods);
    } catch (err: any) {
      const error = new Error(err);
      return new Error(error.message);
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

  async listByTag(id: string) {
    const foodRepository = getCustomRepository(FoodsRepository);

    const foods = await foodRepository.find({ where: { tagFood: id } });

    if (!foods.length) {
      return new Error("Esta categoria não possui comidas cadastradas!");
    }

    return foods;
  }

  async listTop10Foods() {
    const monthSalesRespository = getCustomRepository(MonthSalesRespository);

    const foods = await monthSalesRespository.find({
      order: {
        frequency: "DESC",
      },
      take: 10,
    });

    if (!foods.length) {
      return new Error("Esta categoria não possui comidas cadastradas!");
    }

    return foods;
  }
}

export default FoodService;