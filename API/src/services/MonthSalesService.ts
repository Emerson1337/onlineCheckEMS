import { json } from "express";
import { getCustomRepository } from "typeorm";
import FoodTypesRepository from "../repositories/FoodTypesRepository";
import MonthSalesRespository from "../repositories/MonthSalesRepository";
import * as yup from 'yup';

interface MonthSaleData {
  nameFood: string,
  tagFood: string,
  priceFood: number,
}

class MonthSalesService {

  async addNewMonthSale({ nameFood, tagFood, priceFood }: MonthSaleData) {

    const foodTypeRepository = getCustomRepository(FoodTypesRepository);

    let schema = yup.object().shape({
      name: yup.string().required(),
      price: yup.number().required(),
      description: yup.string().required(),
      createdOn: yup.date().default(function () {
        return new Date();
      }),
    });

    const credentialsTrue = await schema.isValid({ nameFood, tagFood, priceFood });
    const specialCharacters = "/([~!@#$%^&*+=-[],,/{}|:<>?])";

    if (!credentialsTrue) {
      throw new Error("Não é permitido caracteres especiais em nenhum dos campos!");
    }

    for (let i = 0; i < specialCharacters.length; i++) {
      if (nameFood.indexOf(specialCharacters[i]) != -1) {
        throw new Error("Nome inválido!");
      }
      if (tagFood.indexOf(specialCharacters[i]) != -1) {
        throw new Error("Descrição inválida!");
      }
    }

    if (priceFood <= 0) {
      throw new Error("Preço inválido!");
    }

    const foodTypeExists = foodTypeRepository.findOne(tagFood);

    if (!foodTypeExists) {
      throw new Error("Essa categoria não existe!");
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
        throw new Error(error.message);
      }
      return { Success: "Venda efetuada com sucesso!" };
    }

    const newSale = monthSalesRepository.create({
      nameFood,
      tagFood,
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