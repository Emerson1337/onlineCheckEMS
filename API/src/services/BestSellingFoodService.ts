import BestSellingFoodRepository from '../repositories/BestSellingFoodRepository';
import MonthSalesRespository from '../repositories/MonthSalesRepository';
import { getCustomRepository } from 'typeorm';
import * as months from '../assets/months.json';


class BestSellingFoodService {
  public async storeBestFood() {
    const bestSellingFoodRepository = getCustomRepository(BestSellingFoodRepository);
    const monthSalesRepository = getCustomRepository(MonthSalesRespository);

    const mostFrequentlySales = await monthSalesRepository.find({
      order: {
        frequency: "DESC",
      },
    });

    if (!mostFrequentlySales.length) {
      return ('Nenhuma venda registrada neste mês!');
    }


    const mostFrequentlySale = mostFrequentlySales[0];

    var date = new Date();
    var month = date.getMonth().toString();

    const bestFood = bestSellingFoodRepository.create({
      // @ts-ignore
      month: months[month],
      nameFood: mostFrequentlySale.name,
      frequency: mostFrequentlySale.frequency,
    });

    try {
      await bestSellingFoodRepository.save(bestFood);
    } catch (err: any) {
      const error = new Error(err);
      return new Error(error.message);
    }

    return;
  }

  public async bestSoldFoods() {
    const bestSellingFoodRepository = getCustomRepository(BestSellingFoodRepository);

    const allSoldFoods = await bestSellingFoodRepository.find({
      order: {
        created_at: 'ASC',
      }
    });

    return allSoldFoods;
  }
}

export default BestSellingFoodService;