import MoneyMonthlyRepository from '../repositories/MoneyMonthlyRepository';
import MonthSalesRespository from '../repositories/MonthSalesRepository';
import { getCustomRepository } from 'typeorm';
import * as months from '../assets/months.json';

interface MonthSaleInterface {
  id: string,
  name: string,
  tagFood: string,
  price: number,
  frequency: number,
  description: string,
  restaurant_id: string,
  created_at: Date,
  updated_at: Date
}

class MoneyMonthlyService {

  async storeMoneyMonthly() {
    const moneyMonthlyRepository = getCustomRepository(MoneyMonthlyRepository);
    const monthSalesRepository = getCustomRepository(MonthSalesRespository);

    const sales = await monthSalesRepository.find();
    
    // @ts-ignore
    const allSales: MonthSaleInterface = sales;

    if(allSales){
      const salesPerRestaurant = await this.groupBy(allSales, 'restaurant_id');

      for (var salesFromRestaurant of salesPerRestaurant) {
        
        var totalCash = 0;

        Object.values(salesFromRestaurant).forEach((sale: any) => {
          totalCash += (sale.price * sale.frequency);
        });

        var date = new Date();
        var month = date.getMonth().toString();

        const monthlyCash = moneyMonthlyRepository.create({
          // @ts-ignore
          month: months[month],
          price: totalCash,
        });

        try {
          await moneyMonthlyRepository.save(monthlyCash);
        } catch (err: any) {
          const error = new Error(err);
          return new Error(error.message);
        }
      };
      
      return ({ 'Success': 'sucesso!' });

    } else {
      return ({ 'Success': 'Sem vendas registradas nesse mês!' });
    }
  }

  async groupBy(collection: MonthSaleInterface, property: string) {
    var group: any = [];

    Object.values(collection).forEach((item) => {
      group[item.restaurant_id] ? group[item.restaurant_id].push(item) : group[item.restaurant_id] = [item];
    });

    return group;
  }

  async getMoneyMonthly(enterpriseId: string) {
    try {
      const moneyMonthlyRepository = getCustomRepository(MoneyMonthlyRepository);
      const moneyMonthly = await moneyMonthlyRepository.find({
        where: {
          restaurant_id: enterpriseId,
        },
        order: {
          created_at: "ASC",
        },
        take: 10
      });
      return moneyMonthly;
    } catch (err: any) {
      const error = new Error(err);
      return new Error(error.message);
    }
  }
}

export default MoneyMonthlyService;