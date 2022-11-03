import { PrismaClient } from '@prisma/client';
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
  NotFoundError,
} from '@prisma/client/runtime';
import { RepositoryRuntimeError, Result } from 'core-domain/lib';

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

export const handleError = (e: unknown): RepositoryRuntimeError => {
  if (
    e instanceof PrismaClientKnownRequestError ||
    e instanceof PrismaClientUnknownRequestError ||
    e instanceof PrismaClientRustPanicError ||
    e instanceof PrismaClientInitializationError
  ) {
    // The .code property can be accessed in a type-safe manner
    return new RepositoryRuntimeError(e.message, e.clientVersion);
  } else if (e instanceof NotFoundError) {
    return new RepositoryRuntimeError(e.message);
  } else if (e instanceof PrismaClientValidationError) {
    return new RepositoryRuntimeError(
      `Validation Error ${(e as any)?.message}`
    );
  }
  return new RepositoryRuntimeError(
    `Internal Database Error ${(e as any)?.message}`
  );
};

export const RequiredArgumentResult = (): Result<
  RepositoryRuntimeError,
  never
> => {
  return Result.left(new RepositoryRuntimeError(`arguments is required`));
};
