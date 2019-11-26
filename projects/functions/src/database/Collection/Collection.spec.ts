/* eslint-disable no-underscore-dangle */
import 'mocha';
import { expect } from 'chai';
import faker from 'faker';

import { User } from '../User/User.model';
import * as userService from '../User/User.service';
import { userDraftCreator } from '../User/User.seed';
import { Note } from '../Note/Note.model';
import * as noteService from '../Note/Note.service';
import { noteDraftCreator } from '../Note/Note.seed';
import { Attraction } from '../Attraction/Attraction.model';
import * as attractionService from '../Attraction/Attraction.service';
import { attractionDraftCreator } from '../Attraction/Attraction.seed';
import * as locationService from '../Location/Location.service';
import { locationDraftCreator } from '../Location/Location.seed';

import { Collection } from './Collection.model';
import * as collectionService from './Collection.service';
import { collectionDraftCreator, dangerouslyDropAllRecords } from './Collection.seed';

describe(`database: ${Collection.name}`, () => {
  let testUser: User;
  let sharedWithUser: User;
  let collectedNote: Note;
  let collectedAttraction: Attraction;

  before(async () => {
    testUser = await userService.create(userDraftCreator());
    sharedWithUser = await userService.create(userDraftCreator());
    collectedNote = await noteService.create(noteDraftCreator({ createdBy: testUser }));
    collectedAttraction = await attractionService.create(
      attractionDraftCreator({
        createdBy: testUser,
        location: await locationService.create(locationDraftCreator()),
      }),
    );
  });

  afterEach(async () => {
    await dangerouslyDropAllRecords();
  });

  it('create', async () => {
    const draft = collectionDraftCreator({ createdBy: testUser });
    const collection = await collectionService.create(draft);

    expect(collection.id).to.be.not.eq(undefined);
    expect(collection.created).to.be.not.eq(undefined);
    expect(collection.title).to.be.eq(draft.title);
    expect(collection.createdBy.email).to.be.eql(testUser.email);
    expect(collection.notes).to.be.not.eq(undefined);
    expect(collection.attractions).to.be.not.eq(undefined);
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

  describe('users', () => {
    it('link', async () => {
      const collection = await collectionService.create(collectionDraftCreator({ createdBy: testUser }));
      const updated = await collectionService.link({ collection, entity: sharedWithUser });

      expect(updated.users[0].email).to.be.eq(sharedWithUser.email);
    });

    it('uniq', async () => {
      const collection = await collectionService.create(collectionDraftCreator({ createdBy: testUser }));

      await collectionService.link({ collection, entity: sharedWithUser });
      await collectionService.link({ collection, entity: sharedWithUser }).catch((err: Error) => {
        expect(err.message).contains(
          `${sharedWithUser.kind}: ${sharedWithUser.id} already exists in collection: ${collection.id}`,
        );
      });
    });

    it('unlink', async () => {
      const collection = await collectionService.create(collectionDraftCreator({ createdBy: testUser }));
      const linked = await collectionService.link({ collection, entity: sharedWithUser });
      expect(linked.users.length).to.be.eq(1);

      const unlinked = await collectionService.unlink({ collection, entity: sharedWithUser });
      expect(unlinked.users.length).to.be.eq(0);
    });
  });

  describe('notes', () => {
    it('link', async () => {
      const collection = await collectionService.create(collectionDraftCreator({ createdBy: testUser }));
      const updated = await collectionService.link({ collection, entity: collectedNote });

      expect(updated.notes[0].id).to.be.eq(collectedNote.id);
    });

    it('uniq', async () => {
      const collection = await collectionService.create(collectionDraftCreator({ createdBy: testUser }));

      await collectionService.link({ collection, entity: collectedNote });
      await collectionService.link({ collection, entity: collectedNote }).catch((err: Error) => {
        expect(err.message).contains(
          `${collectedNote.kind}: ${collectedNote.id} already exists in collection: ${collection.id}`,
        );
      });
    });

    it('unlink', async () => {
      const collection = await collectionService.create(collectionDraftCreator({ createdBy: testUser }));
      const linked = await collectionService.link({ collection, entity: collectedNote });
      expect(linked.notes.length).to.be.eq(1);

      const unlinked = await collectionService.unlink({ collection, entity: collectedNote });
      expect(unlinked.notes.length).to.be.eq(0);
    });
  });

  describe('attractions', () => {
    it('link', async () => {
      const collection = await collectionService.create(collectionDraftCreator({ createdBy: testUser }));
      const updated = await collectionService.link({ collection, entity: collectedAttraction });

      expect(updated.attractions[0].id).to.be.eq(collectedAttraction.id);
    });

    it('uniq', async () => {
      const collection = await collectionService.create(collectionDraftCreator({ createdBy: testUser }));

      await collectionService.link({ collection, entity: collectedAttraction });
      await collectionService.link({ collection, entity: collectedAttraction }).catch((err: Error) => {
        expect(err.message).contains(
          `${collectedAttraction.kind}: ${collectedAttraction.id} already exists in collection: ${collection.id}`,
        );
      });
    });

    it('unlink', async () => {
      const collection = await collectionService.create(collectionDraftCreator({ createdBy: testUser }));
      const linked = await collectionService.link({ collection, entity: collectedAttraction });
      expect(linked.attractions.length).to.be.eq(1);

      const unlinked = await collectionService.unlink({ collection, entity: collectedAttraction });
      expect(unlinked.attractions.length).to.be.eq(0);
    });
  });
});
