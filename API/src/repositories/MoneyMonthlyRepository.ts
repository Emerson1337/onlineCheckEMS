import { EntityRepository, Repository } from "typeorm";

import MoneyMonthly from '../entities/MoneyMonthly';

@EntityRepository(MoneyMonthly)
class MoneyMonthlyRepository extends Repository<MoneyMonthly>{
}

export default MoneyMonthlyRepository;