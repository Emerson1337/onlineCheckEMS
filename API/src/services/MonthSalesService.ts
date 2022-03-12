import { json } from "express";
import { getCustomRepository } from "typeorm";
import FoodTypesRepository from "../repositories/FoodTypesRepository";
import MonthSalesRespository from "../repositories/MonthSalesRepository";
import * as yup from 'yup';

interface MonthSaleData {
  name: string,
  tagFood: string,
  description: string,
  qtd: number,
  price: number,
}

class MonthSalesService {

  async addNewMonthSale({ name, tagFood, qtd, description, price }: MonthSaleData) {

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

    const specialCharacters = "/([!@#$%&*+=[]/{}|:<>])";

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
    const restaurantId = foodTypeExists?.restaurant_id;
    
    if (!foodTypeExists) {
      throw new Error("Essa categoria não existe!");
    }

    const monthSalesRepository = getCustomRepository(MonthSalesRespository);

    const foodAlreadyExists = await monthSalesRepository.findOne({ where: {
      name,
      restaurant_id: restaurantId,
    } });

    if (foodAlreadyExists) {
      foodAlreadyExists.frequency += qtd;
      try {
        await monthSalesRepository.save(foodAlreadyExists);
      } catch (err: any) {
        const error = new Error(err);
        throw new Error(error.message);
      }
      return { Success: "Venda efetuada com sucesso!" };
    } else {
      const newSale = monthSalesRepository.create({
        name,
        restaurant_id: restaurantId,
        tagFood,
        description,
        price,
        frequency: qtd
      })
      await monthSalesRepository.save(newSale);
    }

    return { Success: "Venda efetuada com sucesso!" };
  }

  async addSale(foods: any) {
    const sale = foods.itemsToBuy.map(async (item: any) => {
      var name = item.name;
      var tagFood = item.category;
      var description = item.description;
      var qtd = item.qtd;
      var price = item.price;

      await this.addNewMonthSale({ name, tagFood, qtd, description, price });
    });

    if (sale) {
      return { Success: "Venda efetuada com sucesso!" };
    } else {
      return { error: "Algo deu errado!" };
    }
  }

  async deleteAllData() {
    const monthSalesRepository = getCustomRepository(MonthSalesRespository);
    const allSales = await monthSalesRepository.find();
    try {
      for (var sale of allSales) {
        await monthSalesRepository.delete(sale.id);
      };
    } catch (error) {
      return { error: "Algo deu errado!" };
    }
  
      return { Success: "Tabela limpa com sucesso!" };
    }
}

export default MonthSalesService;