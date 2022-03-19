import BestSellingCategoryRepository from '../../../repositories/BestSellingCategoryRepository';
import MonthSalesRespository from '../../../repositories/MonthSalesRepository';
import { getCustomRepository } from 'typeorm';
import * as months from '../../../assets/months.json';
import FoodTypeService from '../services/FoodTypeService';
import UsersRepository from '../../../repositories/UsersRepository';

class BestSellingCategoryService {
  public async storeBestCategory() {
    const bestSellingCategoryRepository = getCustomRepository(BestSellingCategoryRepository);
    const monthSalesRepository = getCustomRepository(MonthSalesRespository);
    const enterpriseRepository = getCustomRepository(UsersRepository);

    const foodTypeService = new FoodTypeService();

    const allEnterprises = await enterpriseRepository.find();
    for (var enterprise of allEnterprises){
      const allCategories = await foodTypeService.listAllTags(enterprise.enterprise); //picking all categories from restaurant

      var mostFrequentlyCategories: any = [];

      var allSales = await monthSalesRepository.find({ where: {
        restaurant_id: enterprise.id
      } }); //all sales from restaurant

      if (!allSales.length) {
        return ('Nenhuma venda registrada neste mês!');
      }

      Object.values(allCategories).forEach(async (category: any) => {
        //picking all categories name
        var allSalesCategoryName = allSales.filter((obj) => {
          return obj.tagFood == category.id;
        })

        //counting total sold by category
        var sum = 0;
        allSalesCategoryName.forEach(element => {
          sum += element.frequency;
        });

        //creating a object with category name and your total sold
        var objectSum = {
          name: category.name,
          frequency: sum
        };

        //array with all sum by category
        mostFrequentlyCategories.push(objectSum);
      });

      const sizeObject = mostFrequentlyCategories.length;

      var higghestFrequency = 0;
      var mostFrequentlyTagFood;

      for (let i = 0; i < sizeObject; i++) {
        var value = mostFrequentlyCategories[i].frequency;
        if (higghestFrequency < value) {
          higghestFrequency = value;
          mostFrequentlyTagFood = mostFrequentlyCategories[i].name;
        }
      }

      var date = new Date();
      var month = date.getMonth().toString();

      const bestCategory = bestSellingCategoryRepository.create({
        // @ts-ignore
        month: months[month],
        tagFood: mostFrequentlyTagFood,
        frequency: higghestFrequency,
        restaurant_id: enterprise.id
      });

      try {
        await bestSellingCategoryRepository.save(bestCategory);
      } catch (err: any) {
        const error = new Error(err);
        throw new Error(error.message);
      }
    };

    return;
  }
}

export default BestSellingCategoryService;