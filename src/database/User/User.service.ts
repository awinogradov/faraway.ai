import { getRepository } from 'typeorm';
import { v1 } from 'uuid';

import { logger } from '../../utils/logger';
import { User, UserAuthInput } from './User.entity';

export class UserService {
  private repository = getRepository(User);

  findOne(id: string): Promise<User | undefined> {
      logger.debug('find one user');
      return this.repository.findOne({ id });
  }

  async create(user: UserAuthInput): Promise<User> {
      logger.debug('create a new user => ', user);
      const newUser = new User();
      newUser.id = v1();
      newUser.email = user.email;
      newUser.password = user.password;
      newUser.hashPassword();

      const savedUser = await this.repository.save(newUser);
      // this.eventDispatcher.dispatch(events.user.created, newUser);
      return savedUser;
  }

  async validate(user: UserAuthInput): Promise<User | undefined> {
    logger.debug('validate user => ', user);
    const existingUser = await this.repository.findOne({ email: user.email });

    if (!existingUser) return;

    const validUser = existingUser.checkIfUnencryptedPasswordIsValid(user.password);

    if (!validUser) return;

    return existingUser;
  }

  // update(id: string, geoMap: GeoMap): Promise<GeoMap> {
  //     logger.debug('Update a geoMap');
  //     geoMap.id = id;
  //     return this.repository.save(geoMap);
  // }

  async delete(id: string): Promise<void> {
      logger.debug('delete a user', id);
      await this.repository.delete(id);
      return;
  }
}
