import {
  Entity,
  Column,
} from 'typeorm';

import DefaultClass from './DefaultClass';

@Entity('BestSellingFood')
class BestSellingFood extends DefaultClass {
  @Column()
  month: string;

  @Column()
  nameFood: string;

  @Column('uuid')
  restaurant_id: string;

  @Column()
  frequency: number;
}

export default BestSellingFood;
