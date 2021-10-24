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
      description: yup.string().required()
    });

    // const credentialsTrue = await schema.isValid({ price, tagFood });
    const specialCharacters = "/([!@#$%^&*+=-[],,/{}|:<>?])";

    // if (!credentialsTrue) {
    //   throw new Error("Não é permitido caracteres especiais em nenhum dos campos!");
    // }

    for (let i = 0; i < specialCharacters.length; i++) {
      if (name.indexOf(specialCharacters[i]) != -1) {
        throw new Error("Nome inválido!");
      }
      if (description.length < 3) {
        throw new Error("A descrição pricesa ter entre 3 e 100 caracteres!");
      }
    }

    if (price <= 0) {
      throw new Error("Preço inválido!");
    }

    const foodTypeExists = foodsTypeRepository.findOne(tagFood);

    if (!foodTypeExists) {
      throw new Error("Essa categoria não existe!");
    }

    const food = foodsRepository.create({ name, price, tagFood, description });

    try {
      await foodsRepository.save(food);
    } catch (err: any) {
      const error = new Error(err);
      throw new Error(error.message);
    }

    return food;
  }

  public async editFood(id: string, { name, price, tagFood, description }: Request) {
    const foodRepository = getCustomRepository(FoodsRepository);

    let food = await foodRepository.findOne({ where: { id } });

    if (!food) {
      return new Error("Comida não encontrada!");
    }

    const foodUpdated = await foodRepository.update({ id }, {
      name,
      price,
      description,
      tagFood
    });

    return foodUpdated;
  }

  public async removeFood(id: string) {
    const foodsRepository = getCustomRepository(FoodsRepository);

    const foods = await foodsRepository.findOne(id);

    if (!foods) {
      throw new Error("Essa comida não existe!");
    }
    try {
      await foodsRepository.remove(foods);
    } catch (err: any) {
      const error = new Error(err);
      throw new Error(error.message);
    }

    return foods;
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