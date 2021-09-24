import MoneyMonthlyRepository from '../repositories/MoneyMonthlyRepository';
import MonthSalesRespository from '../repositories/MonthSalesRepository';
import { getCustomRepository } from 'typeorm';
import * as months from '../assets/months.json';

class MoneyMonthlyService {
  async storeMoneyMonthly() {
    const moneyMonthlyRepository = getCustomRepository(MoneyMonthlyRepository);
    const monthSalesRepository = getCustomRepository(MonthSalesRespository);

    const allSales = await monthSalesRepository.find();

    var totalCash = 0;

    allSales.forEach(sale => {
      totalCash += (sale.priceFood * sale.frequency);
    });

    var date = new Date();
    var month = date.getMonth().toString();

    const monthlyCash = moneyMonthlyRepository.create({
      month: months[month],
      price: totalCash,
    });

    await moneyMonthlyRepository.save(monthlyCash);

    return;
  }
}

export default MoneyMonthlyService;