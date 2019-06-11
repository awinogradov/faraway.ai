import { createLogger, transports, format } from 'winston';

const { combine, timestamp, simple } = format;

export const logger = createLogger({
  level: 'info',
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    // new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // new winston.transports.File({ filename: 'combined.log' })
    new transports.Console({
      format: combine(
        timestamp(),
        simple(),
      ),
      level: process.env.DEBUG === '1' ? 'debug' : 'verbose',
    }),
  ]
});
