import BestSellingCategoryRepository from '../repositories/BestSellingCategoryRepository';
import MonthSalesRespository from '../repositories/MonthSalesRepository';
import { getCustomRepository } from 'typeorm';
import * as months from '../assets/months.json';


class BestSellingCategoryService {
  async storeBestCategory() {
    const bestSellingCategoryRepository = getCustomRepository(BestSellingCategoryRepository);
    const monthSalesRepository = getCustomRepository(MonthSalesRespository);

    const mostFrequentlySales = await monthSalesRepository.find({
      order: {
        frequency: "DESC",
      },
    });

    const mostFrequentlySale = mostFrequentlySales[0];

    var date = new Date();
    var month = date.getMonth().toString();

    const bestFood = bestSellingCategoryRepository.create({
      month: months[month],
      tagFood: mostFrequentlySale.tagFood,
      frequency: mostFrequentlySale.frequency,
    });

    await bestSellingCategoryRepository.save(bestFood);

    return;
  }
}

export default BestSellingCategoryService;