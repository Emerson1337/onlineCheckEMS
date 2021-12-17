import { json } from "express";
import { getCustomRepository } from "typeorm";
import FoodTypesRepository from "../repositories/FoodTypesRepository";
import MonthSalesRespository from "../repositories/MonthSalesRepository";
import * as yup from 'yup';

interface MonthSaleData {
  name: string,
  tagFood: string,
  description: string,
  price: number,
}

class MonthSalesService {

  async addNewMonthSale({ name, tagFood, description, price }: MonthSaleData) {

    const foodTypeRepository = getCustomRepository(FoodTypesRepository);

    let schema = yup.object().shape({
      name: yup.string().required('O nome da comida é obrigatório.'),
      tagFood: yup.string().required('A categoria da comida é obrigatória.'),
      price: yup.number().required('O campo preço é obrigatório'),
      description: yup.string().required('O campo descrição é obrigatório')
    });

    await schema.validate({ name, tagFood, description, price }).catch((err) => {
      throw new Error(err.errors);
    });

    const specialCharacters = "/([!@#$%^&*+=[],,/{}|:<>?])";

    for (let i = 0; i < specialCharacters.length; i++) {
      if (name.indexOf(specialCharacters[i]) != -1) {
        throw new Error("Nome inválido!");
      }
      if (tagFood.indexOf(specialCharacters[i]) != -1) {
        throw new Error("Categoria inválida!");
      }
      if (description.indexOf(specialCharacters[i]) != -1) {
        throw new Error("Descrição inválida!");
      }
    }

    if (price <= 0) {
      throw new Error("Preço inválido!");
    }

    const foodTypeExists = await foodTypeRepository.findOne({ where: { id: tagFood } });

    if (!foodTypeExists) {
      throw new Error("Essa categoria não existe!");
    }

    const monthSalesRepository = getCustomRepository(MonthSalesRespository);

    const foodAlreadyExists = await monthSalesRepository.findOne({ name });

    if (foodAlreadyExists) {
      foodAlreadyExists.frequency++;
      const updateSale = monthSalesRepository.create(foodAlreadyExists);
      try {
        await monthSalesRepository.save(updateSale);
      } catch (err: any) {
        const error = new Error(err);
        throw new Error(error.message);
      }
      return { Success: "Venda efetuada com sucesso!" };
    }

    const newSale = monthSalesRepository.create({
      name,
      tagFood,
      description,
      price,
      frequency: 1
    })

    await monthSalesRepository.save(newSale);
    return { Success: "Venda efetuada com sucesso!" };
  }

  async deleteAllData() {
    const monthSalesRepository = getCustomRepository(MonthSalesRespository);
    const allSales = await monthSalesRepository.find();

    const deleted = allSales.forEach(async sale => {
      await monthSalesRepository.delete(sale.id);
    });

    if (deleted!) {
      return { Success: "Tabela limpa com sucesso!" };
    } else {
      return { error: "Alguma coisa deu errada!" };
    }
  }
}

export default MonthSalesService;