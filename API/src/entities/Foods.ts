import {
  Entity,
  Column,
} from 'typeorm';

import DefaultClass from './DefaultClass';

@Entity('Foods')
class Foods extends DefaultClass {
  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  image_id: string;

  @Column()
  price: number;

  @Column('uuid')
  restaurant_id: string;

  @Column()
  description: string;

  @Column()
  tagFood: string;
}

export default Foods;
