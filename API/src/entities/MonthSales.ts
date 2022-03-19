import {
  Entity,
  Column,
} from 'typeorm';

import DefaultClass from './DefaultClass';

@Entity('MonthSales')
class MonthSales extends DefaultClass{
  @Column()
  name: string;

  @Column()
  tagFood: string;

  @Column()
  description: string;

  @Column('uuid')
  restaurant_id: string;

  @Column()
  price: number;

  @Column()
  frequency: number;

  image: string | undefined;
}

export default MonthSales;
