import { EntityRepository, Repository } from "typeorm";

import BestSellingCategory from '../models/BestSellingCategory';

@EntityRepository(BestSellingCategory)
class BestSellingCategoryRepository extends Repository<BestSellingCategory>{
}

export default BestSellingCategoryRepository;