import { to as awaitTo } from 'await-to-js';

interface ParsedError {
  filename: string;
  line: string;
  row: string;
  message: string;
  type: string;
  stack: string;
}
type ErrorParser = (error: Error | {} | null | undefined) => ParsedError;
const parseError: ErrorParser = require('parse-error');

export async function to<T = any>(promise: Promise<any>) {
    let err: Error | null;
    let res: T;

    [err, res] = await awaitTo(promise);

    return err ? [parseError(err)] : [null, res];
};

export const pe = parseError;

export class ServerError extends Error {
  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
  }
  status?: number;
}
