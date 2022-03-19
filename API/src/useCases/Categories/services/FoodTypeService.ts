import { IRequest } from './../FoodTypesDTO';
import { getCustomRepository } from "typeorm";
import FoodTypesRepository from "../../../repositories/FoodTypesRepository";
import * as yup from 'yup';
import UsersRepository from "../../../repositories/UsersRepository";

class FoodTypeService {
  public async create(name: string, enterpriseId: string) {
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

    const foodAlreadyExists = await foodTypesRepository.findOne({
      where: {
        name,
        restaurant_id: enterpriseId,
      }
    });

    if (foodAlreadyExists) {
      throw new Error("Essa categoria já existe!");
    }

    const foodType = foodTypesRepository.create({ name, restaurant_id: enterpriseId });
    await foodTypesRepository.save(foodType);

    return foodType;
  }

  public async listAllTags(enterprise: string) { 
    if(!enterprise || enterprise == "undefined") {
      throw new Error("Restaurante não informado!");
    }

    const foodTypesRepository = getCustomRepository(FoodTypesRepository);

    const enterpriseRepository = getCustomRepository(UsersRepository);

    const enterpriseFound = await enterpriseRepository.findOne({
      where: {
        enterprise
      }
    });

    if(!enterpriseFound) {
      return new Error("Restaurante não encontrado!");
    }

    const foodsTypes = await foodTypesRepository.find({
      order: {
        created_at: 'DESC',
      },
      where: {
        restaurant_id: enterpriseFound.id,
      }
    });

    return foodsTypes;
  }

  public async removeTag(id: string, enterpriseId: string) {
    const foodTypeRepository = getCustomRepository(FoodTypesRepository);
    const tag = await foodTypeRepository.findOne({
      where: {
        id,
        restaurant_id: enterpriseId,
      }
    });

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

  public async editTag({ id, name }: IRequest, enterpriseId: string) {
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

    let tag = await foodTypesRepository.findOne({ where: { id, restaurant_id: enterpriseId } });

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