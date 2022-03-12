import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

import { v4 as uuid } from 'uuid';

@Entity('MonthSales')
class MonthSales {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
  
  image: string | undefined;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default MonthSales;
