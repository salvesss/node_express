import fs from 'fs';
import path from 'path';
import type { ErrorRequestHandler, Request } from 'express';
import winston from 'winston';
import morgan from 'morgan';

const logsDir = path.join(process.cwd(), 'logs');

fs.mkdirSync(logsDir, { recursive: true });

const lineFormat = winston.format.printf(
  ({ level, message, timestamp, stack, ...meta }) => {
    const metaStr =
      meta && typeof meta === 'object' && Object.keys(meta).length > 0
        ? ` ${JSON.stringify(meta)}`
        : '';
    const stackSuffix = stack ? `\n${stack}` : '';
    return `${timestamp} [${level}] ${message}${metaStr}${stackSuffix}`;
  }
);

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    winston.format.errors({ stack: true }),
    lineFormat
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(logsDir, 'app.log'),
      level: 'info',
    }),
    new winston.transports.File({
      filename: path.join(logsDir, 'error.log'),
      level: 'error',
    }),
    new winston.transports.Console(),
  ],
});

morgan.token('req-query', (req) =>
  JSON.stringify((req as Request).query ?? {})
);
morgan.token('req-body', (req) =>
  JSON.stringify((req as Request).body ?? {})
);

/** Middleware: журналирует метод, URL, query, body и код ответа (morgan → winston → файлы). */
export function requestLoggerMiddleware(): ReturnType<typeof morgan> {
  const stream = {
    write: (line: string) => {
      logger.info(line.trim());
    },
  };
  return morgan(':method :url req-query=:req-query req-body=:req-body :status', {
    stream,
  });
}

/** Централизованный middleware ошибок Express: журнал в error.log (и общий лог через winston). */
export function errorHandlerMiddleware(): ErrorRequestHandler {
  return (err, _req, res, next): void => {
    if (res.headersSent) {
      next(err);
      return;
    }

    const e = err instanceof Error ? err : new Error(String(err));
    logger.error(`Unhandled route error: ${e.message}`, { stack: e.stack });
    res.status(500).json({ message: 'Internal Server Error' });
  };
}

export function registerProcessErrorHandlers(): void {
  process.on('uncaughtException', (uncaughtErr: Error) => {
    logger.error(`uncaughtException: ${uncaughtErr.message}`, {
      stack: uncaughtErr.stack,
    });
    process.exit(1);
  });

  process.on('unhandledRejection', (reason: unknown) => {
    const msg = reason instanceof Error ? reason.message : String(reason);
    const stack =
      reason instanceof Error && reason.stack ? reason.stack : undefined;
    logger.error(`unhandledRejection: ${msg}`, { ...(stack ? { stack } : {}) });
  });
}
