import { json } from "express";
import { getCustomRepository } from "typeorm";
import MonthSalesRespository from "../repositories/MonthSalesRepository";

interface MonthSaleData {
  nameFood: string,
  tagFood: string,
  priceFood: number,
}

class MonthSalesService {

  async addNewMonthSale({ nameFood, tagFood, priceFood }: MonthSaleData) {
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