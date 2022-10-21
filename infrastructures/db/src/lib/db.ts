import { PrismaClient } from '@prisma/client';
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime';
import { RepositoryErrorMessage } from 'core-domain';

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var db: PrismaClient | undefined;
}

export const db =
  global.db ??
  new PrismaClient(
    process.env.NODE_ENV === 'development'
      ? {
          log: [
            {
              emit: 'stdout',
              level: 'query',
            },
            {
              emit: 'stdout',
              level: 'error',
            },
            {
              emit: 'stdout',
              level: 'info',
            },
            {
              emit: 'stdout',
              level: 'warn',
            },
          ],
        }
      : undefined
  );

if (process.env.NODE_ENV !== 'production') {
  global.db = db;
}

export const handleError = (e: unknown): RepositoryErrorMessage => {
  if (
    e instanceof PrismaClientKnownRequestError ||
    e instanceof PrismaClientUnknownRequestError ||
    e instanceof PrismaClientRustPanicError ||
    e instanceof PrismaClientInitializationError ||
    e instanceof PrismaClientValidationError
  ) {
    // The .code property can be accessed in a type-safe manner
    return e.message;
  }
  return 'Internal Server Error';
};
