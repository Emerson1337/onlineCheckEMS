import {
  Entity,
  Column,
} from 'typeorm';

import DefaultClass from './DefaultClass';

@Entity('FoodTypes')
class FoodTypes extends DefaultClass {
  @Column()
  name: string;

  @Column('uuid')
  restaurant_id: string;
}

export default FoodTypes;
