import { Request } from 'express';
import { Connection } from 'typeorm';

export interface GraphQLContext {
  request: Request;
  dbConnection: Connection;
}

export type GraphQLAuthCredentials = ['x-token', string];

export interface WebAssets {
  client: {
    css?: string;
    js?: string;
  };
}
