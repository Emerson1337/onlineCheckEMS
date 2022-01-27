import { EntityRepository, Repository } from "typeorm";

import RestaurantInfo from '../models/RestaurantInfo';

@EntityRepository(RestaurantInfo)
class RestaurantInfoRespository extends Repository<RestaurantInfo>{
}

export default RestaurantInfoRespository;