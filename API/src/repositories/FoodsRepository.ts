import { EntityRepository, Repository } from "typeorm";

import Food from '../models/Foods';

@EntityRepository(Food)
class FoodsRepository extends Repository<Food>{
}

export default FoodsRepository;