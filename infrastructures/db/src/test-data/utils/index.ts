import { Either, Result } from 'core-domain/lib';

export const getOrThrow = async <L, R>(e: Result<L, R>): Promise<R> => {
  const result = await e();
  if (Either.isLeft(result)) {
    throw new Error('is left');
  }
  return result.right;
};
