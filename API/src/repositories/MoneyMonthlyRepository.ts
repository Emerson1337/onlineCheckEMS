import { EntityRepository, Repository } from "typeorm";

import MoneyMonthly from '../models/MoneyMonthly';

@EntityRepository(MoneyMonthly)
class MoneyMonthlyRepository extends Repository<MoneyMonthly>{
}

export default MoneyMonthlyRepository;