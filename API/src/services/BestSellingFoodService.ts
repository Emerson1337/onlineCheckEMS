import BestSellingFoodRepository from '../repositories/BestSellingFoodRepository';
import MonthSalesRespository from '../repositories/MonthSalesRepository';
import { getCustomRepository } from 'typeorm';
import * as months from '../assets/months.json';


class BestSellingFoodService {
  async storeBestFood() {
    const bestSellingFoodRepository = getCustomRepository(BestSellingFoodRepository);
    const monthSalesRepository = getCustomRepository(MonthSalesRespository);

    const mostFrequentlySales = await monthSalesRepository.find({
      order: {
        frequency: "DESC",
      },
    });

    const mostFrequentlySale = mostFrequentlySales[0];

    var date = new Date();
    var month = date.getMonth().toString();

    const bestFood = bestSellingFoodRepository.create({
      month: months[month],
      nameFood: mostFrequentlySale.nameFood,
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

  async topTenFoods() {
    const monthSalesRepository = getCustomRepository(MonthSalesRespository);

    const topTenFoods = await monthSalesRepository.find({
      order: {
        frequency: "DESC",
      },
      take: 10
    });

    return topTenFoods;
  }
}

export default BestSellingFoodService;