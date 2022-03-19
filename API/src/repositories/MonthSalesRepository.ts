import { EntityRepository, getCustomRepository, Repository } from "typeorm";

import MonthSales from '../entities/MonthSales';
import FoodsRepository from "./FoodsRepository";

@EntityRepository(MonthSales)
class MonthSalesRespository extends Repository<MonthSales>{
    async getImageByFoodName(name: string) {
        const foodsRepository = getCustomRepository(FoodsRepository);

        const food = await foodsRepository.findOne({
            where: {
                name
            }
        })
        
        return food?.image;
    }
}

export default MonthSalesRespository;