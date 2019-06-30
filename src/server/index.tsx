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
          <html lang="en">
          <head>
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta charSet='utf-8' />
              <title>Razzle TypeScript</title>
              <meta name="viewport" content="width=device-width, initial-scale=1">
              ${assets.client.css
                  ? `<link rel="stylesheet" href="${assets.client.css}">`
                  : ''
              }
          </head>
          <body>
              <div id="root">${markup}</div>
              ${NODE_ENV === 'production'
                  ? `<script src="${assets.client.js}" defer></script>`
                  : `<script src="${assets.client.js}" defer crossorigin></script>`
              }
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
