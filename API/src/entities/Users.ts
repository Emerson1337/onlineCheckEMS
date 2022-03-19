import {
  Entity,
  Column,
} from 'typeorm';

import DefaultClass from './DefaultClass';

@Entity('Users')
class User extends DefaultClass {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  enterprise: string;

  @Column({ nullable: true })
  logo: string;

  @Column()
  phone_number: string;

  @Column()
  delivery_fee: number;
}

export default User;
