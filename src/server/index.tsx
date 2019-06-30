import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import express, { Request, Response, NextFunction } from 'express';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookiesParser from 'cookie-parser';

import { WebAssets } from '../typings';
import { logger } from '../utils/logger';
import { ServerError } from '../utils/errors';
import { App } from '../components/App/App';

process.on('unhandledRejection', (e: any) => console.error(e.message, e.stack));

const app = express();
const assets: WebAssets = require(process.env.RAZZLE_ASSETS_MANIFEST!);

export async function serve() {
  const {
    PORT,
    DEBUG,
    NODE_ENV,
  } = process.env;

  logger.debug('env', {
    PORT,
    DEBUG,
  });

  app
    .disable('x-powered-by')
    .use(cors())
    .use(helmet())
    .use(cookiesParser())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(morgan('tiny'))
    .use(compression())
    .use('/', express.static(__dirname + '/public'))
    .get(['/', '/signin'], (req: Request, res: Response) => {
      const context = {};
      const markup = renderToString(
        <StaticRouter context={context} location={req.url}>
          <App />
        </StaticRouter>
      );

      let cssResources = '';
      if (NODE_ENV === 'production') {
        cssResources += `<link rel="stylesheet" href="${assets.client.css}">`;
      }

      const setCrossorigin = NODE_ENV === 'production' ? '' : 'crossorigin';
      const cdnLinks = `
        <script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
      `;

      let jsResources = `<script src="${assets.client.js}" defer${setCrossorigin}></script>`;
      if (NODE_ENV === 'production') {
        jsResources = cdnLinks + jsResources;
      }

      res.send(
        `<!doctype html>
          <html lang="en">
          <head>
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta charSet='utf-8' />
              <title>Faraway AI — Personal travel assitant.</title>
              <meta name="viewport" content="width=device-width, initial-scale=1">
              ${cssResources}
          </head>
          <body>
              <div id="root">${markup}</div>
              ${jsResources}
          </body>
        </html>`
      );
    });

  app
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

  const http = app.listen(PORT, () => {
    logger.info('server started', PORT);
  });

  const stop = () => {
    http.close(() => logger.debug('server stoped'));
  };

  return { http, stop };
}
