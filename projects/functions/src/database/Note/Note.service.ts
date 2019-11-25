import { EntityUpdate } from '../../typings';

import { Note, NoteDraft } from './Note.model';

export async function snapshot(note: Note): Promise<Note> {
  return Note.findOne(note)
    .populate('createdBy')
    .populate('collections')
    .catch(err => {
      throw new Error(err);
    });
}

export async function create(draft: NoteDraft): Promise<Note> {
  const note = new Note(draft);

  await note.save().catch(err => {
    throw new Error(err);
  });

  if (!note) {
    throw new Error(`Can't create note: ${JSON.stringify(draft)}`);
  }

  return snapshot(note);
}

export async function update({ entity: note, diff }: EntityUpdate<Note, Omit<NoteDraft, 'createdBy'>>): Promise<Note> {
  const draft = await Note.findOne(note);

  if (!draft) {
    throw new Error(`Can't find note "${JSON.stringify(note)}"`);
  }

  // @ts-ignore check for non TS usage
  if (diff.createdBy) {
    throw new Error(`Can't update createdBy field`);
  }

  Object.keys(diff).forEach(field => {
    // @ts-ignore
    draft[field] = diff[field];
  });

  await draft.save().catch(err => {
    throw new Error(err);
  });

  return snapshot(draft);
}

export async function remove(draft: NoteDraft) {
  await Note.deleteOne(draft).catch(err => {
    throw new Error(err);
  });
}

export function dangerouslyDropAllRecords() {
  return Note.deleteMany({});
}

export const notePublicApi = {
  create: true,
  snapshot: true,
  update: true,
  remove: true,
};
export type NotePublicApi = typeof notePublicApi;
export type AllowedNotePublicCalls = Array<keyof NotePublicApi>;
export const allowedMethods = Object.keys(notePublicApi) as AllowedNotePublicCalls;
