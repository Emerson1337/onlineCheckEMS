import BestSellingFoodRepository from '../../../repositories/BestSellingFoodRepository';
import MonthSalesRespository from '../../../repositories/MonthSalesRepository';
import { getCustomRepository } from 'typeorm';
import * as months from '../../../assets/months.json';
import UsersRepository from '../../../repositories/UsersRepository';

class BestSellingFoodService {
  public async storeBestFood() {
    const bestSellingFoodRepository = getCustomRepository(BestSellingFoodRepository);
    const monthSalesRepository = getCustomRepository(MonthSalesRespository);
    const enterpriseRepository = getCustomRepository(UsersRepository);

    const allEnterprises = await enterpriseRepository.find();
    for (var enterprise of allEnterprises) {
      const mostFrequentlySales = await monthSalesRepository.find({
        where: {
          restaurant_id: enterprise.id
        },
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
        restaurant_id: enterprise.id,
      });

      try {
        await bestSellingFoodRepository.save(bestFood);
      } catch (err: any) {
        const error = new Error(err);
        throw new Error(error.message);
      }
    };
    return;
  }

  public async bestSoldFoods(enterpriseId: string) {
    const bestSellingFoodRepository = getCustomRepository(BestSellingFoodRepository);
    const enterpriseRepository = getCustomRepository(UsersRepository);

    const enterpriseFromDb = await enterpriseRepository.findOne(enterpriseId);

    if(enterpriseFromDb) {

      const allSoldFoods = await bestSellingFoodRepository.find({
        where: {
          restaurant_id: enterpriseFromDb.id
        },
        order: {
          created_at: 'ASC',
        }
      });

      return allSoldFoods;
    } else {
      throw new Error("Restaurante não encontrado!");
    }
  }
}

export default BestSellingFoodService;