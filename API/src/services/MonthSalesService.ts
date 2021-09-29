import { json } from "express";
import { getCustomRepository } from "typeorm";
import FoodTypesRepository from "../repositories/FoodTypesRepository";
import MonthSalesRespository from "../repositories/MonthSalesRepository";
import * as yup from 'yup';

interface MonthSaleData {
  nameFood: string,
  tagFood: string,
  description: string,
  priceFood: number,
}

class MonthSalesService {

  async addNewMonthSale({ nameFood, tagFood, description, priceFood }: MonthSaleData) {

    const foodTypeRepository = getCustomRepository(FoodTypesRepository);

    let schema = yup.object().shape({
      nameFood: yup.string().required(),
      tagFood: yup.string().required(),
    });

    const credentialsTrue = await schema.isValid({ nameFood, tagFood });
    const specialCharacters = "/([~!@#$%^&*+=-[],,/{}|:<>?])";

    if (!credentialsTrue) {
      return new Error("Não é permitido caracteres especiais em nenhum dos campos!");
    }

    for (let i = 0; i < specialCharacters.length; i++) {
      if (nameFood.indexOf(specialCharacters[i]) != -1) {
        return new Error("Nome inválido!");
      }
      if (tagFood.indexOf(specialCharacters[i]) != -1) {
        return new Error("Categoria inválida!");
      }
      if (description.indexOf(specialCharacters[i]) != -1) {
        return new Error("Descrição inválida!");
      }
    }

    if (priceFood <= 0) {
      return new Error("Preço inválido!");
    }

    const foodTypeExists = await foodTypeRepository.findOne({ where: { name: tagFood } });

    if (!foodTypeExists) {
      return new Error("Essa categoria não existe!");
    }

    const monthSalesRepository = getCustomRepository(MonthSalesRespository);

    const foodAlreadyExists = await monthSalesRepository.findOne({ nameFood });

    if (foodAlreadyExists) {
      foodAlreadyExists.frequency++;
      const updateSale = monthSalesRepository.create(foodAlreadyExists);
      try {
        await monthSalesRepository.save(updateSale);
      } catch (err: any) {
        const error = new Error(err);
        return new Error(error.message);
      }
      return { Success: "Venda efetuada com sucesso!" };
    }

    const newSale = monthSalesRepository.create({
      nameFood,
      tagFood,
      description,
      priceFood,
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