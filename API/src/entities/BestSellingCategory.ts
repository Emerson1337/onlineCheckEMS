import {
  Entity,
  Column,
} from 'typeorm';

import DefaultClass from './DefaultClass';

@Entity('BestSellingCategory')
class BestSellingCategory extends DefaultClass {
  @Column()
  month: string;

  @Column()
  tagFood: string;

  @Column('uuid')
  restaurant_id: string;

  @Column()
  frequency: number;
}

export default BestSellingCategory;
