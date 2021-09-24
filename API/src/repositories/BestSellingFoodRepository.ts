import { EntityRepository, Repository } from "typeorm";

import BestSellingFood from '../models/BestSellingFood';

@EntityRepository(BestSellingFood)
class BestSellingFoodRepository extends Repository<BestSellingFood>{
}

export default BestSellingFoodRepository;