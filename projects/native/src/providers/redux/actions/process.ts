import { createAction } from '../../../utils/actionCreator';
import { processActionTypes } from '../constants/process';

interface ProcessUpdateProps {
  key: string;
  error?: Error;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
}

export const emitProcess = (key: ProcessUpdateProps['key']) => createAction(processActionTypes.EMIT_PROCESS, key);
export const processError = (props: ProcessUpdateProps) => createAction(processActionTypes.PROCESS_ERROR, props);
export const processSuccess = (props: ProcessUpdateProps) => createAction(processActionTypes.PROCESS_SUCCESS, props);
export const deleteProcess = (key: ProcessUpdateProps['key']) => createAction(processActionTypes.DELETE_PROCESS, key);
