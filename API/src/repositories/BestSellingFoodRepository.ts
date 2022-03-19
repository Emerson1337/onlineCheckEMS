import { EntityRepository, Repository } from "typeorm";

import BestSellingFood from '../entities/BestSellingFood';

@EntityRepository(BestSellingFood)
class BestSellingFoodRepository extends Repository<BestSellingFood>{
}

export default BestSellingFoodRepository;