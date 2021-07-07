import { getCustomRepository } from "typeorm";
import FoodTypesRepository from "../repositories/FoodTypesRepository";
import * as yup from 'yup';

class FoodTypeService {
  async create(name: string) {
    const foodTypesRepository = getCustomRepository(FoodTypesRepository);

    let schema = yup.object().shape({
      name: yup.string().required(),
      createdOn: yup.date().default(function () {
        return new Date();
      }),
    });

    const credentialsTrue = await schema.isValid({ name });
    const specialCharacters = "/([~!@#$%^&*+=-[],,/{}|:<>?])";

    if (!credentialsTrue) {
      throw new Error("Name of food type is invalid!")
    }

    if (name.length <= 0) {
      throw new Error("Password is too small!");
    }

    for (let i = 0; i < specialCharacters.length; i++) {
      if (name.indexOf(specialCharacters[i]) != -1) {
        throw new Error("Name is invalid!");
      }
    }
    const foodAlreadyExists = await foodTypesRepository.findOne({ name });

    if (foodAlreadyExists) {
      throw new Error("Food Type already exists!");
    }

    const foodType = foodTypesRepository.create({ name });
    await foodTypesRepository.save(foodType);

    return foodType;
  }

  async listAllTags() {
    const foodTypesRepository = getCustomRepository(FoodTypesRepository);

    const foodsTypes = await foodTypesRepository.find();

    return foodsTypes;
  }

  async removeTag(name: string) {
    const foodTypeRepository = getCustomRepository(FoodTypesRepository);
    const tag = await foodTypeRepository.findOne({ name });

    if (!tag) {
      throw new Error("This tag doesn't exists!");
    }

    await foodTypeRepository.remove(tag);

    return {
      message: "Success!"
    }
  }

  async editTag(tagToEdit: string, name: string) {
    const foodTypesRepository = getCustomRepository(FoodTypesRepository);

    let tag = await foodTypesRepository.findOne({ name: tagToEdit });

    if (!tag) {
      throw new Error("This tag doens't exists!");
    }

    await foodTypesRepository.update(
      { name: tagToEdit },
      { name }
    )

    tag = await foodTypesRepository.findOne({ name })

    if (!tag) {
      throw new Error("Something is wrong!");
    }

    return tag;
  }
}

export { FoodTypeService };