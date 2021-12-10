import BestSellingCategoryRepository from '../repositories/BestSellingCategoryRepository';
import MonthSalesRespository from '../repositories/MonthSalesRepository';
import { getCustomRepository } from 'typeorm';
import * as months from '../assets/months.json';
import FoodTypeService from '../services/FoodTypeService';


class BestSellingCategoryService {
  public async storeBestCategory() {
    const bestSellingCategoryRepository = getCustomRepository(BestSellingCategoryRepository);
    const monthSalesRepository = getCustomRepository(MonthSalesRespository);

    const foodTypeService = new FoodTypeService();
    const allCategories = await foodTypeService.listAllTags(); //picking all categories

    var mostFrequentlyCategories: any = [];

    var allSales = await monthSalesRepository.find(); //all sales

    if (!allSales.length) {
      return new Error('Nenhuma venda registrada neste mês!');
    }

    allCategories.forEach(async category => {
      //picking all categories name
      var allSalesCategoryName = allSales.filter((obj) => {
        return obj.tagFood == category.name;
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
    });

    try {
      await bestSellingCategoryRepository.save(bestCategory);
    } catch (err: any) {
      const error = new Error(err);
      return new Error(error.message);
    }

    return bestCategory;
  }
}

export default BestSellingCategoryService;