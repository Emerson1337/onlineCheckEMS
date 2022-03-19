import { EntityRepository, Repository } from "typeorm";

import BestSellingCategory from '../entities/BestSellingCategory';

@EntityRepository(BestSellingCategory)
class BestSellingCategoryRepository extends Repository<BestSellingCategory>{
}

export default BestSellingCategoryRepository;