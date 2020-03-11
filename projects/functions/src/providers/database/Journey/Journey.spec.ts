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

import { Journey } from './Journey.model';
import * as journeyService from './Journey.service';
import { journeyDraftCreator, dangerouslyDropAllRecords } from './Journey.seed';

describe(`database: ${Journey.name}`, () => {
  let testUser: User;
  let sharedWithUser: User;
  let collectedNote: Note;

  before(async () => {
    testUser = await userService.create(userDraftCreator());
    sharedWithUser = await userService.create(userDraftCreator());
    collectedNote = await noteService.create(noteDraftCreator({ createdBy: testUser }));
  });

  afterEach(async () => {
    await dangerouslyDropAllRecords();
  });

  it('create', async () => {
    const draft = journeyDraftCreator({ createdBy: testUser._id });
    const journey = await journeyService.create(draft);

    expect(journey.id).to.be.not.eq(undefined);
    expect(journey.created).to.be.not.eq(undefined);
    expect(journey.title).to.be.eq(draft.title);
    expect(journey.createdBy.email).to.be.eql(testUser.email);
    expect(journey.notes).to.be.not.eq(undefined);
  });

  it('update', async () => {
    const updatedTitle = faker.lorem.words(4);
    const journey = await journeyService.create(journeyDraftCreator({ createdBy: testUser._id }));
    const updatedJourney = await journeyService.update({ entity: journey, diff: { title: updatedTitle } });

    expect(updatedJourney.title).to.be.eq(updatedTitle);
  });

  it('update: disalow update createdBy', async () => {
    const journey = await journeyService.create(journeyDraftCreator({ createdBy: testUser._id }));

    await journeyService
      .update({
        entity: journey,
        // @ts-ignore check for non TS usage
        diff: { createdBy: sharedWithUser._id },
      })
      .catch((err: Error) => {
        expect(err.message).includes(`Can't update createdBy field`);
      });
  });

  it('remove', async () => {
    const journey = await journeyService.create(journeyDraftCreator({ createdBy: testUser._id }));
    expect(journey).to.be.not.eq(null);

    await journeyService.remove(journey);
    const found = await journeyService.snapshot(journey);

    expect(found).to.be.eq(null);
  });

  describe('members', () => {
    it('link', async () => {
      const journey = await journeyService.create(journeyDraftCreator({ createdBy: testUser._id }));
      const updated = await journeyService.link({ journey, entity: sharedWithUser });

      expect(updated.members[0].email).to.be.eq(sharedWithUser.email);
    });

    it('uniq', async () => {
      const journey = await journeyService.create(journeyDraftCreator({ createdBy: testUser._id }));

      await journeyService.link({ journey, entity: sharedWithUser });
      await journeyService.link({ journey, entity: sharedWithUser }).catch((err: Error) => {
        expect(err.message).contains(
          `${sharedWithUser.kind}: ${sharedWithUser.id} already exists in journey: ${journey.id}`,
        );
      });
    });

    it('unlink', async () => {
      const journey = await journeyService.create(journeyDraftCreator({ createdBy: testUser._id }));
      const linked = await journeyService.link({ journey, entity: sharedWithUser });
      expect(linked.members.length).to.be.eq(1);

      const unlinked = await journeyService.unlink({ journey, entity: sharedWithUser });
      expect(unlinked.members.length).to.be.eq(0);
    });
  });

  describe('notes', () => {
    it('link', async () => {
      const journey = await journeyService.create(journeyDraftCreator({ createdBy: testUser._id }));
      const updated = await journeyService.link({ journey, entity: collectedNote });

      expect(updated.notes[0].id).to.be.eq(collectedNote.id);
    });

    it('uniq', async () => {
      const journey = await journeyService.create(journeyDraftCreator({ createdBy: testUser._id }));

      await journeyService.link({ journey, entity: collectedNote });
      await journeyService.link({ journey, entity: collectedNote }).catch((err: Error) => {
        expect(err.message).contains(
          `${collectedNote.kind}: ${collectedNote.id} already exists in journey: ${journey.id}`,
        );
      });
    });

    it('unlink', async () => {
      const journey = await journeyService.create(journeyDraftCreator({ createdBy: testUser._id }));
      const linked = await journeyService.link({ journey, entity: collectedNote });
      expect(linked.notes.length).to.be.eq(1);

      const unlinked = await journeyService.unlink({ journey, entity: collectedNote });
      expect(unlinked.notes.length).to.be.eq(0);
    });
  });

  // describe('attractions', () => {
  //   it('link', async () => {
  //     const journey = await journeyService.create(journeyDraftCreator({ createdBy: testUser.oauth }));
  //     const updated = await journeyService.link({ journey, entity: collectedAttraction });

  //     expect(updated.attractions[0].id).to.be.eq(collectedAttraction.id);
  //   });

  //   it('uniq', async () => {
  //     const journey = await journeyService.create(journeyDraftCreator({ createdBy: testUser.oauth }));

  //     await journeyService.link({ journey, entity: collectedAttraction });
  //     await journeyService.link({ journey, entity: collectedAttraction }).catch((err: Error) => {
  //       expect(err.message).contains(
  //         `${collectedAttraction.kind}: ${collectedAttraction.id} already exists in journey: ${journey.id}`,
  //       );
  //     });
  //   });

  //   it('unlink', async () => {
  //     const journey = await journeyService.create(journeyDraftCreator({ createdBy: testUser.oauth }));
  //     const linked = await journeyService.link({ journey, entity: collectedAttraction });
  //     expect(linked.attractions.length).to.be.eq(1);

  //     const unlinked = await journeyService.unlink({ journey, entity: collectedAttraction });
  //     expect(unlinked.attractions.length).to.be.eq(0);
  //   });
  // });
});
