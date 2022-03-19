import { EntityRepository, Repository } from 'typeorm';

import User from '../entities/Users';

@EntityRepository(User)
class UsersRepository extends Repository<User>{
}

export default UsersRepository;