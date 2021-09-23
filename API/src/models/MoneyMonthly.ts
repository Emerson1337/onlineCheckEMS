import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

import { v4 as uuid } from 'uuid';

@Entity('MoneyMonthly')
class MoneyMonthly {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  month: string;

  @Column()
  price: number;

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

export default MoneyMonthly;
