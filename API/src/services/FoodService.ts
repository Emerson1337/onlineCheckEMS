import { getCustomRepository } from 'typeorm';
import FoodsRepository from '../repositories/FoodsRepository';
import FoodTypesRepository from '../repositories/FoodTypesRepository';
import * as yup from 'yup';
import MonthSalesRespository from '../repositories/MonthSalesRepository';
import { validate as validateUuid } from 'uuid';
import cloudinary from '../utils/cloudinary';

interface Request {
  name: string;
  price: number;
  tagFood: string;
  image: {
    thumbUrl: string,
    originFileObj: {
      uid: string
    },

  };
  description: string;
}

class FoodService {
  public async create({ name, image, price, tagFood, description }: Request) {
    const foodsRepository = getCustomRepository(FoodsRepository)
    const foodsTypeRepository = getCustomRepository(FoodTypesRepository)

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

    const foodTypeExists = foodsTypeRepository.findOne(tagFood);

    if (!foodTypeExists) {
      throw new Error("Essa categoria não existe!");
    }

    const imageLink = await cloudinary.uploader.upload(image.thumbUrl,
      {
        public_id: image.originFileObj.uid
      }
    );

    const food = foodsRepository.create({
      name,
      image: imageLink.url,
      price,
      tagFood,
      description
    });

    try {
      await foodsRepository.save(food);
    } catch (err: any) {
      const error = new Error(err);
      throw new Error(error.message);
    }

    return food;
  }

  public async editFood(id: string, { name, image, price, tagFood, description }: Request) {
    const foodRepository = getCustomRepository(FoodsRepository);
    const foodTypesRepository = getCustomRepository(FoodTypesRepository);

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

    let food = await foodRepository.findOne({ where: { id } });

    if (!food) {
      return new Error("Comida não encontrada!");
    }

    let category = await foodTypesRepository.findOne({ where: { id: tagFood } });

    if (!category) {
      return new Error("Categoria não encontrada!");
    }

    const imageLink = await cloudinary.uploader.upload(image.thumbUrl,
      {
        public_id: image.originFileObj.uid
      }
    );
    // const imageLink = await cloudinary.uploader.destroy(image.originFileObj.uid);
    const foodUpdated = await foodRepository.update({ id }, {
      name,
      image: imageLink.url,
      price,
      description,
      tagFood
    });

    return foodUpdated;
  }

  public async removeFood(id: string) {
    const foodsRepository = getCustomRepository(FoodsRepository);

    if (!validateUuid(id)) {
      throw new Error("Identificação inválida!");
    }

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
    const foods = await foodsRepository.find({
      order: {
        created_at: 'DESC',
      }
    });

    return foods;
  }

  async listByTag(id: string) {
    const foodRepository = getCustomRepository(FoodsRepository);

    if (!validateUuid(id)) {
      throw new Error("Identificação inválida!");
    }

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