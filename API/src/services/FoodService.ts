import { getCustomRepository } from 'typeorm';
import FoodsRepository from '../repositories/FoodsRepository';
import FoodTypesRepository from '../repositories/FoodTypesRepository';
import * as yup from 'yup';
import { json } from 'express';

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
      throw new Error("Some value is invalid!");
    }

    for (let i = 0; i < specialCharacters.length; i++) {
      if (name.indexOf(specialCharacters[i]) != -1) {
        throw new Error("Name is invalid!");
      }
      if (description.indexOf(specialCharacters[i]) != -1) {
        throw new Error("Description is invalid!");
      }
    }

    if (price <= 0) {
      throw new Error("Price is invalid!");
    }

    const foodTypeExists = foodsTypeRepository.findOne(foodType);

    if (!foodTypeExists) {
      throw new Error("This type food doesn't exists!");
    }

    const food = foodsRepository.create({ name, price, foodType, description });
    await foodsRepository.save(food);

    return food;
  }

  public async editFood(nameEdit: string, { name, price, foodType, description }: Request) {
    const foodRepository = getCustomRepository(FoodsRepository);

    let food = await foodRepository.findOne({ where: { name: nameEdit } });

    if (!food) {
      throw new Error("This food doesn't exists!");
    }

    await foodRepository.update({ name: nameEdit }, {
      name,
      price,
      description,
      foodType
    });

    food = await foodRepository.findOne({ name });
    if (!food) {
      throw new Error("Something is wrong!");
    }
    return food;
  }

  public async removeFood(name: string) {
    const foodsRepository = getCustomRepository(FoodsRepository);

    const foods = await foodsRepository.findOne({ name });

    if (!foods) {
      throw new Error("This food doesn't exists!");
    }

    await foodsRepository.remove(foods);

    return {
      message: "Success!"
    };
  }

  public async listAllFoods() {
    const foodsRepository = getCustomRepository(FoodsRepository);
    const foods = await foodsRepository.find();

    return foods;
  }
}

export default FoodService;