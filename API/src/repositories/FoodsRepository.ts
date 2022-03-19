import { EntityRepository, Repository } from "typeorm";

import Food from '../entities/Foods';

@EntityRepository(Food)
class FoodsRepository extends Repository<Food>{
}

export default FoodsRepository;