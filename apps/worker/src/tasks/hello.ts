import type { JobHelpers } from 'graphile-worker';

export type HelloTaskPayload = { name: string };

export default async function hello(
  payload: HelloTaskPayload,
  helpers: JobHelpers
) {
  const { name } = payload;
  helpers.logger.info(`Hello, ${name}`);
}
