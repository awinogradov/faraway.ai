import 'reflect-metadata';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { resolve } from 'path';
import express, { Request, Response, NextFunction } from 'express';
import { GraphQLServer /*, PubSub*/ } from 'graphql-yoga';
import { createConnection, ConnectionOptions } from 'typeorm';
import { buildSchema } from 'type-graphql';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookiesParser from 'cookie-parser';

import { dbConnectionUrl } from '../utils/dbConnection';
import { GraphQLContext, WebAssets } from '../typings';
import { logger } from '../utils/logger';
import { ServerError, pe } from '../utils/errors';
import { resolvers, entities } from '../database';
import { authRoutes, authGQLMiddleware } from './auth';
import { App } from '../components/App/App';

process.on('unhandledRejection', (e: any) => console.error(e.message, e.stack));

// const pubsub = new PubSub();

const assets: WebAssets = require(process.env.RAZZLE_ASSETS_MANIFEST!);

const serverDefaultOptions = {
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: process.env.GQL_PLAYGROUND,
};

const dbDefaultOptions = {
  entities,
  type: 'mongodb',
  synchronize: true,
  useNewUrlParser: true,
};

export async function serve() {
  const {
    DATABASE_USER,
    DATABASE_PWD,
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_NAME,
    DATABASE_SRV,
    PORT,
    DEBUG,
  } = process.env;

  logger.debug('env', {
    DATABASE_USER,
    DATABASE_PWD,
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_NAME,
    DATABASE_SRV,
    PORT,
    DEBUG,
  });

  const gqlSchema = await buildSchema({
    resolvers,
    validate: false,
    emitSchemaFile: resolve(__dirname, '../database/schema.gql'),
  });

  const dbOptions = {
    ...dbDefaultOptions,
    url: dbConnectionUrl(),
  } as ConnectionOptions;

  const dbConnection = await createConnection(dbOptions);
  logger.debug('db connected', dbOptions);

  const gqlServer = new GraphQLServer({
    schema: gqlSchema,
    middlewares: [authGQLMiddleware],
    context: ({ request }: GraphQLContext) => ({
      dbConnection,
      request,
    }),
  });

  gqlServer.express
    .disable('x-powered-by')
    .use(cors())
    .use(helmet())
    .use(cookiesParser())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(morgan('tiny'))
    .use(compression())
    .use(authRoutes)
    .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
    .get(['/', '/signin'], (req: Request, res: Response) => {
      const context = {};
      const markup = renderToString(
        <StaticRouter context={context} location={req.url}>
          <App />
        </StaticRouter>
      );

      res.send(
        `<!doctype html>
          <html lang="">
          <head>
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta charSet='utf-8' />
              <title>Razzle TypeScript OMG</title>
              <meta name="viewport" content="width=device-width, initial-scale=1">
              ${
                assets.client.css
                  ? `<link rel="stylesheet" href="${assets.client.css}">`
                  : ''
              }
                ${
                  process.env.NODE_ENV === 'production'
                    ? `<script src="${assets.client.js}" defer></script>`
                    : `<script src="${assets.client.js}" defer crossorigin></script>`
                }
          </head>
          <body>
              <div id="root">${markup}</div>
          </body>
        </html>`
      );
    });

  const serverOptions = {
    ...serverDefaultOptions,
    port: PORT,
  };

  const http = await gqlServer.start(serverOptions, runnedOptions => {
    logger.debug('server is running', runnedOptions);
  });

  gqlServer.express
    .use((_req, _res, next) => {
      const error = new ServerError('Not Found', 404);

      next(error);
    })
    .use((error: ServerError, _req: Request, res: Response, _next: NextFunction) => {
      res.locals.message = error.message;
      res.locals.error = error;

      res.status(error.status || 500);

      DEBUG && console.error(error.message, error.stack);
      res.send(`<h1>${error.status} ${error.message}</h1>`);
    });

  const stop = () => {
    http.close(() => logger.debug('server stoped'));
    dbConnection.close();
  };

  return { http, stop };
}
