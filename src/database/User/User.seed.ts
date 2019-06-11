import { v1 } from 'uuid';
import { Connection } from 'typeorm';

import { SeedFactory } from '../../utils/testing/SeedFactory';
import { User } from './User.entity';

class UserSeedFactory extends SeedFactory<User> {
  name = 'User';

  create() {
    const user = new User();
    user.id = v1();
    user.email = 'test@test.com';
    user.password = 'password';
    user.hashPassword();

    return user;
  }
}

class FakeUser {
  async seed(dbConnection: Connection): Promise<User> {
    const manager = dbConnection.createEntityManager();
    const userFactory = new UserSeedFactory();

    const user = await userFactory.make();
    return manager.save(user);
  }
}

export const user = new FakeUser();


