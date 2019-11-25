/* eslint-disable no-underscore-dangle */
import 'mocha';
import { expect } from 'chai';
import faker from 'faker';

import { NoteDraft, Note } from './Note.model';
import * as noteService from './Note.service';

const noteDraftCreator = (): Readonly<NoteDraft> =>
  Object.freeze({
    content: faker.lorem.paragraphs(2),
  });

const testNote = noteDraftCreator();

describe(`database: ${Note.name}`, () => {
  afterEach(async () => {
    await noteService.dangerouslyDropAllRecords();
  });

  it('create', async () => {
    const note = await noteService.create(testNote);

    expect(note).to.be.not.eq(null);
    expect(note.id).to.be.not.eq(undefined);
    expect(note.content).to.be.eq(testNote.content);
    expect(note.collections).to.be.not.eq(undefined);
  });

  it('update', async () => {
    const updatedContent = faker.lorem.paragraphs(3);

    const note = await noteService.create(testNote);
    const updatedNote = await noteService.update({ note, diff: { content: updatedContent } });
    expect(updatedNote.content).to.be.eq(updatedContent);
  });

  it('remove', async () => {
    const note = await noteService.create(testNote);
    expect(note).to.be.not.eq(null);

    await noteService.remove(note);
    const found = await noteService.snapshot(note);

    expect(found).to.be.eq(null);
  });

  it('snapshot', async () => {
    const note = await noteService.create(testNote);
    const snap = await noteService.snapshot(note);

    expect(snap.content).to.be.eq(note.content);
  });
});
