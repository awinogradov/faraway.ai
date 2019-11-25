/* eslint-disable no-underscore-dangle */
import 'mocha';
import { expect } from 'chai';
import faker from 'faker';

import { User } from '../User/User.model';
import * as userService from '../User/User.service';
import { userDraftCreator } from '../User/User.seed';

import { Collection } from './Collection.model';
import * as collectionService from './Collection.service';
import { collectionDraftCreator } from './Collection.seed';

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
    const draft = collectionDraftCreator({ createdBy: testUser });
    const collection = await collectionService.create(draft);

    expect(collection.id).to.be.not.eq(undefined);
    expect(collection.created).to.be.not.eq(undefined);
    expect(collection.title).to.be.eq(draft.title);
    expect(collection.createdBy.email).to.be.eql(testUser.email);
    expect(collection.notes).to.be.not.eq(undefined);
  });

  it('share', async () => {
    const collection = await collectionService.create(collectionDraftCreator({ createdBy: testUser }));
    const sharedCollection = await collectionService.share({ collection, user: sharedWithUser });

    expect(sharedCollection.sharedWith[0].email).to.be.eql(sharedWithUser.email);
  });

  it('update', async () => {
    const updatedTitle = faker.lorem.words(4);
    const collection = await collectionService.create(collectionDraftCreator({ createdBy: testUser }));
    const updatedCollection = await collectionService.update({ entity: collection, diff: { title: updatedTitle } });

    expect(updatedCollection.title).to.be.eq(updatedTitle);
  });

  it('update: disalow update createdBy', async () => {
    const collection = await collectionService.create(collectionDraftCreator({ createdBy: testUser }));

    await collectionService
      .update({
        entity: collection,
        // @ts-ignore check for non TS usage
        diff: { createdBy: sharedWithUser },
      })
      .catch((err: Error) => {
        expect(err.message).includes(`Can't update createdBy field`);
      });
  });

  it('remove', async () => {
    const collection = await collectionService.create(collectionDraftCreator({ createdBy: testUser }));
    expect(collection).to.be.not.eq(null);

    await collectionService.remove(collection);
    const found = await collectionService.snapshot(collection);

    expect(found).to.be.eq(null);
  });
});
