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
  nameFood: string;

  @Column()
  tagFood: string;

  @Column()
  priceFood: number;

  @Column()
  frequency: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default MonthSales;
