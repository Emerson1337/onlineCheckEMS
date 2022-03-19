import { EntityRepository, Repository } from "typeorm";

import FoodTypes from '../entities/FoodTypes';

@EntityRepository(FoodTypes)
class FoodTypesRepository extends Repository<FoodTypes>{
}

export default FoodTypesRepository;