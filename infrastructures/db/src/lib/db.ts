import { PrismaClient } from '@prisma/client';
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
  NotFoundError,
} from '@prisma/client/runtime';
import { RecordNotFoundError, RuntimeError, Result } from 'core-domain';

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

export const handleError = (e: unknown): RuntimeError => {
  if (
    e instanceof PrismaClientKnownRequestError ||
    e instanceof PrismaClientUnknownRequestError ||
    e instanceof PrismaClientRustPanicError ||
    e instanceof PrismaClientInitializationError
  ) {
    // The .code property can be accessed in a type-safe manner
    return new RuntimeError(e);
  } else if (e instanceof PrismaClientValidationError) {
    return new RuntimeError(e);
  }
  return new RuntimeError(`Internal Database Error ${(e as any)?.message}`);
};

export const handleErrorOrNotFound = (
  e: unknown
): RuntimeError | RecordNotFoundError => {
  if (e instanceof NotFoundError) {
    return new RecordNotFoundError(e);
  }
  return handleError(e);
};
