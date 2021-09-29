import { getCustomRepository } from "typeorm";
import FoodTypesRepository from "../repositories/FoodTypesRepository";
import * as yup from 'yup';
import FoodsRepository from "../repositories/FoodsRepository";

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
      return new Error("O nome da categoria é inválido!")
    }

    if (name.length <= 0) {
      return new Error("Senha curta demais!");
    }

    for (let i = 0; i < specialCharacters.length; i++) {
      if (name.indexOf(specialCharacters[i]) != -1) {
        return new Error("Nome inválido!");
      }
    }

    const foodAlreadyExists = await foodTypesRepository.findOne({ name });

    if (foodAlreadyExists) {
      return new Error("Essa categoria já existe!");
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
      return new Error("Essa categoria não existe!");
    }

    await foodTypeRepository.remove(tag);

    return {
      message: "Sucesso!"
    }
  }

  async editTag(tagToEdit: string, name: string) {
    const foodTypesRepository = getCustomRepository(FoodTypesRepository);

    let tag = await foodTypesRepository.findOne({ name: tagToEdit });

    if (!tag) {
      return new Error("Essa categoria não existe!");
    }

    await foodTypesRepository.update(
      { name: tagToEdit },
      { name }
    )

    tag = await foodTypesRepository.findOne({ name })

    if (!tag) {
      return new Error("Nada encontrado!");
    }

    return tag;
  }
}

export default FoodTypeService;