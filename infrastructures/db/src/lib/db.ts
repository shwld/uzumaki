import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient(
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
