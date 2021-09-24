import { EntityRepository, Repository } from "typeorm";

import MonthSales from '../models/MonthSales';

@EntityRepository(MonthSales)
class MonthSalesRespository extends Repository<MonthSales>{
}

export default MonthSalesRespository;