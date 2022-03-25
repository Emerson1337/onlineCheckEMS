import { IRequestFood } from './../FoodsDTO';
import { getCustomRepository } from 'typeorm';
import FoodsRepository from '../../../repositories/FoodsRepository';
import FoodTypesRepository from '../../../repositories/FoodTypesRepository';
import * as yup from 'yup';
import MonthSalesRespository from '../../../repositories/MonthSalesRepository';
import { validate as validateUuid } from 'uuid';
import cloudinary from '../../../utils/cloudinary';
import UsersRepository from '../../../repositories/UsersRepository';

class FoodService {

  //default repositories
  constructor(
    private foodsRepository: any = getCustomRepository(FoodsRepository),
    private foodsTypeRepository: any = getCustomRepository(FoodTypesRepository),
    private enterpriseRepository: any = getCustomRepository(UsersRepository),
    private monthSalesRespository: any = getCustomRepository(MonthSalesRespository),
    ) {
      foodsRepository ? foodsRepository = this.foodsRepository : '';
      foodsTypeRepository ? foodsTypeRepository = this.foodsTypeRepository : '';
      enterpriseRepository ? enterpriseRepository = this.enterpriseRepository : '';
      monthSalesRespository ? monthSalesRespository = this.monthSalesRespository : '';
    }


  public async create({ name, image, price, tagFood, description }: IRequestFood, enterpriseId: string) {
    let schema = yup.object().shape({
      name: yup.string().required('O campo nome é obrigatório'),
      price: yup.number().required('O campo preço é obrigatório'),
      description: yup.string().required('O campo descrição é obrigatório')
    });

    await schema.validate({ name, price, tagFood, description }).catch((err) => {
      throw new Error(err.errors);
    });

    if (!validateUuid(tagFood)) {
      throw new Error("Selecione uma categoria!");
    }

    const specialCharacters = "/([!@#$%^&*+=-[],,/{}|:<>?])";

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

    const foodTypeExists = this.foodsTypeRepository.findOne({
      where: {
        id: tagFood,
        restaurant_id: enterpriseId
      }
    });

    if (!foodTypeExists) {
      throw new Error("Essa categoria não existe!");
    }

    const imageLink = await cloudinary.uploader.upload(image.thumbUrl,
      {
        public_id: image.uid
      }
    );

    const food = this.foodsRepository.create({
      name,
      restaurant_id: enterpriseId,
      image: imageLink.url,
      image_id: imageLink.public_id,
      price,
      tagFood,
      description
    });

    try {
      await this.foodsRepository.save(food);
    } catch (err: any) {
      const error = new Error(err);
      throw new Error(error.message);
    }

    return food;
  }

  public async editFood(id: string, { name, image, price, tagFood, description }: IRequestFood, enterpriseId: string) {
    let schema = yup.object().shape({
      name: yup.string().required('O campo nome é obrigatório'),
      price: yup.number().required('O campo preço é obrigatório'),
      description: yup.string().required('O campo descrição é obrigatório')
    });

    await schema.validate({ name, price, description }).catch((err) => {
      throw new Error(err.errors);
    });

    if (!validateUuid(tagFood)) {
      throw new Error("Selecione uma categoria!");
    }

    let food = await this.foodsRepository.findOne({ where: { id, restaurant_id: enterpriseId } });

    if (!food) {
      return new Error("Comida não encontrada!");
    }

    let category = await this.foodsTypeRepository.findOne({ where: { id: tagFood, enteprise_id: enterpriseId } });

    if (!category) {
      return new Error("Categoria não encontrada!");
    }

    var imageLink;

    if(image.uid) {
      food.image_id && await cloudinary.uploader.destroy(food.image_id);
      imageLink = await cloudinary.uploader.upload(image.thumbUrl,
        {
          public_id: image.uid
        }
      );
    }

    const foodUpdated = await this.foodsRepository.update({ id }, {
      name,
      restaurant_id: enterpriseId,
      image: imageLink ? imageLink.url : food.image,
      image_id: imageLink ? imageLink.public_id : food.image_id,
      price,
      description,
      tagFood
    });

    return foodUpdated;
  }

  public async removeFood(id: string, enterpriseId: string) {
    if (!validateUuid(id)) {
      throw new Error("Identificação inválida!");
    }

    const foods = await this.foodsRepository.findOne({
      where: {
        id,
        enteprise_id: enterpriseId
      }
    });
    
    if (!foods) {
      throw new Error("Essa comida não existe!");
    }

    try {
      await this.foodsRepository.remove(foods);
      foods.image_id && await cloudinary.uploader.destroy(foods.image_id);
    } catch (err: any) {
      const error = new Error(err);
      throw new Error(error.message);
    }

    return foods;
  }

  public async listAllFoods(enterprise: string) {
    if(!enterprise || enterprise == "undefined") {
      throw new Error("Restaurante não informado!");
    }

    const enterpriseFound = await this.enterpriseRepository.findOne({
      where: {
        enterprise
      }
    });

    if(!enterpriseFound) {
      return new Error("Restaurante não encontrado!");
    }

    const foods = await this.foodsRepository.find({
      order: {
        created_at: 'DESC',
      }, where: {
        restaurant_id: enterpriseFound.id,
      }
    });

    return foods;
  }

  async listByTag(id: string, enterprise: string) {
    if (!validateUuid(id)) {
      throw new Error("Identificação inválida!");
    }

    const enterpriseFound = await this.enterpriseRepository.findOne({ where: {
      enterprise,
    }});

    if(!enterpriseFound) {
      return new Error("Restaurante não encontrado!");
    }

    const foods = await this.foodsRepository.find({ where: { tagFood: id, restaurant_id: enterpriseFound.id } });
    if (!foods.length) {
      return new Error("Esta categoria não possui comidas cadastradas!");
    }

    return foods;
  }

  async listTop10Foods(enterprise: string) {
    const enterpriseFound = await this.enterpriseRepository.findOne({
      where: {
        enterprise
      }
    });

    if(!enterpriseFound) {
      return new Error("Restaurante não encontrado!");
    }

    const foods = await this.monthSalesRespository.find({
      order: {
        frequency: "DESC",
      },
      where: {
        restaurant_id: enterpriseFound.id
      },
      take: 10,
    });

    if (!foods.length) {
      return new Error("Esta categoria não possui comidas cadastradas!");
    }

    for (var food of foods) {
      const image = await this.monthSalesRespository.getImageByFoodName(food.name);
      food.image = image;
    };
    
    return foods;
  }
}

export default FoodService;