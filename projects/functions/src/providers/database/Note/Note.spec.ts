/* eslint-disable no-underscore-dangle */
import 'mocha';
import { expect } from 'chai';
import faker from 'faker';

import { User } from '../User/User.model';
import * as userService from '../User/User.service';
import { userDraftCreator } from '../User/User.seed';

import { Note } from './Note.model';
import * as noteService from './Note.service';
import { noteDraftCreator } from './Note.seed';

describe(`database: ${Note.name}`, () => {
  let testUser: User;
  let anotherTestUser: User;

  before(async () => {
    testUser = await userService.create(userDraftCreator());
    anotherTestUser = await userService.create(userDraftCreator());
  });

  afterEach(async () => {
    await noteService.dangerouslyDropAllRecords();
  });

  it('create', async () => {
    const draft = noteDraftCreator({ createdBy: testUser });
    const note = await noteService.create(draft);

    expect(note.id).to.be.not.eq(undefined);
    expect(note.createdBy).to.be.not.eq(undefined);
    expect(note.content).to.be.eq(draft.content);
    expect(note.createdBy.email).to.be.eq(testUser.email);
    expect(note.journeys).to.be.not.eq(undefined);
  });

  it('update', async () => {
    const updatedContent = faker.lorem.paragraphs(3);

    const note = await noteService.create(noteDraftCreator({ createdBy: testUser }));
    const updatedNote = await noteService.update({ entity: note, diff: { content: updatedContent } });
    expect(updatedNote.content).to.be.eq(updatedContent);
  });

  it('update: disalow update createdBy', async () => {
    const note = await noteService.create(noteDraftCreator({ createdBy: testUser }));

    await noteService
      .update({
        entity: note,
        // @ts-ignore check for non TS usage
        diff: { createdBy: anotherTestUser },
      })
      .catch((err: Error) => {
        expect(err.message).includes(`Can't update createdBy field`);
      });
  });

  it('remove', async () => {
    const note = await noteService.create(noteDraftCreator({ createdBy: testUser }));
    expect(note).to.be.not.eq(null);

    await noteService.remove(note);
    const found = await noteService.snapshot(note);

    expect(found).to.be.eq(null);
  });
});
