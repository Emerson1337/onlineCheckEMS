import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

import { v4 as uuid } from 'uuid';

@Entity('BestSellingCategory')
class BestSellingCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  month: string;

  @Column()
  tagFood: number;

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

export default BestSellingCategory;
