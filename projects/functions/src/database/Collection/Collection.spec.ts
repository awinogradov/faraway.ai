/* eslint-disable no-underscore-dangle */
import 'mocha';
import { expect } from 'chai';
import faker from 'faker';

import * as userService from '../User/User.service';
import { User, UserDraft } from '../User/User.model';

import { CollectionDraft, Collection } from './Collection.model';
import * as collectionService from './Collection.service';

const provideTestCollection = (createdBy: User): Readonly<CollectionDraft> =>
  Object.freeze({
    title: faker.lorem.words(3),
    createdBy: createdBy._id,
  });

const userDraftCreator = (): Readonly<UserDraft> =>
  Object.freeze({
    email: faker.internet.email(),
    oauth: faker.random.uuid(),
  });

describe(`database: ${Collection.name}`, () => {
  let testUser: User;
  let sharedWithUser: User;

  before(async () => {
    testUser = await userService.create(userDraftCreator());
    sharedWithUser = await userService.create(userDraftCreator());
  });

  afterEach(async () => {
    await collectionService.dangerouslyDropAllRecords();
  });

  it('create', async () => {
    const draft = provideTestCollection(testUser);
    const collection = await collectionService.create(draft);

    expect(collection).to.be.not.eq(null);
    expect(collection.id).to.be.not.eq(undefined);
    expect(collection.created).to.be.not.eq(undefined);
    expect(collection.title).to.be.eq(draft.title);
    expect(collection.createdBy.email).to.be.eql(testUser.email);
  });

  it('share', async () => {
    const collection = await collectionService.create(provideTestCollection(testUser));
    const sharedCollection = await collectionService.share({ collection, user: sharedWithUser });

    expect(sharedCollection.sharedWith[0].email).to.be.eql(sharedWithUser.email);
  });

  it('update', async () => {
    const updatedTitle = faker.lorem.words(4);
    const collection = await collectionService.create(provideTestCollection(testUser));
    const updatedCollection = await collectionService.update({ collection, diff: { title: updatedTitle } });

    expect(updatedCollection.title).to.be.eq(updatedTitle);
  });

  it('remove', async () => {
    const collection = await collectionService.create(provideTestCollection(testUser));
    expect(collection).to.be.not.eq(null);

    await collectionService.remove(collection);
    const found = await collectionService.snapshot(collection);

    expect(found).to.be.eq(null);
  });
});
