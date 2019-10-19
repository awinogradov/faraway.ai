export enum clipboardActionTypes {
  CONTENT_READ = 'clipboard/CONTENT_READ',
  CONTENT_WRITE = 'clipboard/CONTENT_WRITE',
}

export const clipboardRead = (clipboardContent: string) => ({
  type: clipboardActionTypes.CONTENT_READ,
  payload: clipboardContent,
});

export const clipboardWrite = (clipboardContent: string) => ({
  type: clipboardActionTypes.CONTENT_WRITE,
  payload: clipboardContent,
});

export type ClipboardActions = ReturnType<typeof clipboardRead | typeof clipboardWrite>;
