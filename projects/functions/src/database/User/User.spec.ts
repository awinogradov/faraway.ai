/* eslint-disable no-underscore-dangle */
import 'mocha';
import { expect } from 'chai';
import faker from 'faker';

import { UserDraft } from './User.model';
import * as userService from './User.service';

const userDraftCreator = (): Readonly<UserDraft> =>
  Object.freeze({
    email: faker.internet.email(),
    oauth: faker.random.uuid(),
  });

const testUser = userDraftCreator();
const brotherOfTestUser = userDraftCreator();

describe('database: User', () => {
  afterEach(async () => {
    await userService.dangerouslyDropAllRecords();
  });

  it('create', async () => {
    const user = await userService.create(testUser);

    expect(user).to.be.not.eq(null);
    expect(user.id).to.be.not.eq(undefined);
    expect(user.email).to.be.eq(testUser.email);
    expect(user.oauth).to.be.eq(testUser.oauth);
    expect(user.created).to.be.not.eq(undefined);
    expect(user.collections).to.be.not.eq(undefined);
  });

  it('create: disallow duplicate', async () => {
    await userService.create(testUser);

    await userService.create(testUser).catch(err => {
      expect(err.message).includes(`dup key: { : "${testUser.email}" }`);
    });
  });

  it('update', async () => {
    const updatedEmail = faker.internet.email();

    const user = await userService.create(testUser);
    const updatedUser = await userService.update({ user, diff: { email: updatedEmail } });
    expect(updatedUser.email).to.be.eq(updatedEmail);
  });

  it('update: disallow updating to existing email', async () => {
    await userService.create(brotherOfTestUser);

    const user = await userService.create(testUser);

    await userService.update({ user, diff: { email: brotherOfTestUser.email } }).catch(err => {
      expect(err.message).includes(`dup key: { : "${brotherOfTestUser.email}" }`);
    });
  });

  it('remove', async () => {
    const user = await userService.create(testUser);
    expect(user).to.be.not.eq(null);

    await userService.remove(user);
    const found = await userService.snapshot(user);

    expect(found).to.be.eq(null);
  });

  it('snapshot', async () => {
    const user = await userService.create(testUser);
    const snap = await userService.snapshot(user);

    expect(snap.email).to.be.eq(user.email);
  });
});
