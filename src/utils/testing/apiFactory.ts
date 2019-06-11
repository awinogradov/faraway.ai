import supertest, { SuperTest, Test } from 'supertest';

import { runTestEnv, TestServer } from '.';
import { GraphQLAuthCredentials } from '../../typings';

export type ApiRequest = SuperTest<Test>;
let req: ApiRequest;
export let testEnv: TestServer;
export const apiFactory = async () => {
  testEnv = testEnv || await runTestEnv();
  // req = req || supertest(testEnv.app.httpServer);
  return req;
};
export const credentials = ([
  process.env.JWT_HEADER,
  process.env.JWT_TESTING_TOKEN,
] as GraphQLAuthCredentials);
