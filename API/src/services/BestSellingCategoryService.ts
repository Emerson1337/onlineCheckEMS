import BestSellingCategoryRepository from '../repositories/BestSellingCategoryRepository';
import MonthSalesRespository from '../repositories/MonthSalesRepository';
import { getCustomRepository } from 'typeorm';
import * as months from '../assets/months.json';
import FoodTypesRepository from '../repositories/FoodTypesRepository';
import FoodTypes from '../models/FoodTypes';
import FoodTypeService from '../services/FoodTypeService';


class BestSellingCategoryService {
  public async storeBestCategory() {
    const bestSellingCategoryRepository = getCustomRepository(BestSellingCategoryRepository);
    const monthSalesRepository = getCustomRepository(MonthSalesRespository);

    const foodTypeService = new FoodTypeService();
    const allCategories = await foodTypeService.listAllTags();

    var mostFrequentlyCategories: any = [];

    var aux = await monthSalesRepository.find();
    allCategories.forEach(async category => {
      var aux2 = aux.filter((obj) => {
        return obj.tagFood == category.name;
      })

      var sum = 0;
      aux2.forEach(element => {
        sum += element.frequency;
      });

      var objectSum = {
        name: category.name,
        frequency: sum
      };

      mostFrequentlyCategories.push(objectSum);
    });

    const sizeObject = mostFrequentlyCategories.length;

    var higghestFrequency = 0;
    var tagFood;
    for (let i = 0; i < sizeObject; i++) {
      var value = mostFrequentlyCategories[i].frequency;
      if (higghestFrequency < value) {
        higghestFrequency = value;
        tagFood = mostFrequentlyCategories[i].name;
      }
    }

    var date = new Date();
    var month = date.getMonth().toString();

    const bestFood = bestSellingCategoryRepository.create({
      month: months[month],
      tagFood: tagFood,
      frequency: higghestFrequency,
    });

    await bestSellingCategoryRepository.save(bestFood);

    return;
  }
}

export default BestSellingCategoryService;