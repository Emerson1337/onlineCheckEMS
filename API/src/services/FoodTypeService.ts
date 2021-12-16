import { getCustomRepository } from "typeorm";
import FoodTypesRepository from "../repositories/FoodTypesRepository";
import * as yup from 'yup';
import FoodsRepository from "../repositories/FoodsRepository";

interface Request {
  id: string;
  name: string;
}

class FoodTypeService {
  public async create(name: string) {
    const foodTypesRepository = getCustomRepository(FoodTypesRepository);

    let schema = yup.object().shape({
      name: yup.string().required('O campo nome é obrigatório'),
    });

    await schema.validate({ name }).catch((err) => {
      throw new Error(err.errors);
    });

    const specialCharacters = "/([~!@#$%^&*+=-[],,/{}|:<>?])";

    if (name.length <= 0) {
      throw new Error("Nome curto demais!");
    }

    for (let i = 0; i < specialCharacters.length; i++) {
      if (name.indexOf(specialCharacters[i]) != -1) {
        throw new Error("Nome inválido!");
      }
    }

    const foodAlreadyExists = await foodTypesRepository.findOne({ name });

    if (foodAlreadyExists) {
      throw new Error("Essa categoria já existe!");
    }

    const foodType = foodTypesRepository.create({ name });
    await foodTypesRepository.save(foodType);

    return foodType;
  }

  public async listAllTags() {
    const foodTypesRepository = getCustomRepository(FoodTypesRepository);

    const foodsTypes = await foodTypesRepository.find({
      order: {
        created_at: 'DESC',
      }
    });

    return foodsTypes;
  }

  public async removeTag(id: string) {
    const foodTypeRepository = getCustomRepository(FoodTypesRepository);
    const tag = await foodTypeRepository.findOne(id);

    if (!tag) {
      throw new Error("Essa categoria não existe!");
    }

    const success = await foodTypeRepository.remove(tag);

    if (success) {
      return tag
    } else {
      throw new Error("Erro ao salvar no banco de dados.")
    }

  }

  public async editTag({ id, name }: Request) {
    const foodTypesRepository = getCustomRepository(FoodTypesRepository);

    let schema = yup.object().shape({
      name: yup.string().required('O campo nome é obrigatório'),
    });

    await schema.validate({ name }).catch((err) => {
      throw new Error(err.errors);
    });

    const specialCharacters = "/([~!@#$%^&*+=-[],,/{}|:<>?])";

    if (name.length <= 0) {
      throw new Error("Nome curto demais!");
    }

    for (let i = 0; i < specialCharacters.length; i++) {
      if (name.indexOf(specialCharacters[i]) != -1) {
        throw new Error("Nome inválido!");
      }
    }

    let tag = await foodTypesRepository.findOne({ where: { id } });

    if (!tag) {
      return new Error("Essa categoria não existe!");
    }

    const tagUpdated = await foodTypesRepository.update(
      { id },
      { name }
    );

    return tagUpdated;
  }
}

export default FoodTypeService;