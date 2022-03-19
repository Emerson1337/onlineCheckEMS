import {
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
  } from 'typeorm';
  
  import { v4 as uuid } from 'uuid';
  
  class DefaultClass {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
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
  
  export default DefaultClass;
  