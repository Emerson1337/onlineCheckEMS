import {
  Entity,
  Column,
} from 'typeorm';

import DefaultClass from './DefaultClass';

@Entity('MoneyMonthly')
class MoneyMonthly extends DefaultClass{
  @Column()
  month: string;

  @Column('uuid')
  restaurant_id: string;

  @Column()
  price: number;
}

export default MoneyMonthly;
