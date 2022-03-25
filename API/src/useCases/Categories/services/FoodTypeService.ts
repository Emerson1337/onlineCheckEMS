import { IRequest } from './../FoodTypesDTO';
import { getCustomRepository } from "typeorm";
import FoodTypesRepository from "../../../repositories/FoodTypesRepository";
import * as yup from 'yup';
import UsersRepository from "../../../repositories/UsersRepository";

class FoodTypeService {

  //default repositories
  constructor(
    private foodsTypeRepository: any = getCustomRepository(FoodTypesRepository),
    ) {
      foodsTypeRepository ? this.foodsTypeRepository = foodsTypeRepository : this.foodsTypeRepository = getCustomRepository(FoodTypesRepository);
    }

  public async create(name: string, enterpriseId: string) {
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

    const foodAlreadyExists = await this.foodsTypeRepository.findOne({
      where: {
        name,
        restaurant_id: enterpriseId,
      }
    });

    if (foodAlreadyExists) {
      throw new Error("Essa categoria já existe!");
    }

    const foodType = this.foodsTypeRepository.create({ name, restaurant_id: enterpriseId });
    await this.foodsTypeRepository.save(foodType);

    return foodType;
  }

  public async listAllTags(enterprise: string) {
    const enterpriseRepository = getCustomRepository(UsersRepository);

    if(!enterprise || enterprise == "undefined") {
      throw new Error("Restaurante não informado!");
    }

    const enterpriseFound = await enterpriseRepository.findOne({
      where: {
        enterprise
      }
    });

    if(!enterpriseFound) {
      return new Error("Restaurante não encontrado!");
    }

    const foodsTypes = await this.foodsTypeRepository.find({
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
    const tag = await this.foodsTypeRepository.findOne({
      where: {
        id,
        restaurant_id: enterpriseId,
      }
    });

    if (!tag) {
      throw new Error("Essa categoria não existe!");
    }

    const success = await this.foodsTypeRepository.remove(tag);

    if (success) {
      return tag
    } else {
      throw new Error("Erro ao salvar no banco de dados.")
    }

  }

  public async editTag({ id, name }: IRequest, enterpriseId: string) {
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

    let tag = await this.foodsTypeRepository.findOne({ where: { id, restaurant_id: enterpriseId } });

    if (!tag) {
      return new Error("Essa categoria não existe!");
    }

    const tagUpdated = await this.foodsTypeRepository.update(
      { id },
      { name }
    );

    return tagUpdated;
  }
}

export default FoodTypeService;