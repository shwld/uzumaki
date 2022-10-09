import type { Background } from 'domain-interfaces';
import * as jobs from './jobs';
import type { JobHelpers as OriginalJobHelpers } from 'graphile-worker';
export * from './lib/runner';

export type JobHelpers = OriginalJobHelpers;

export const createBackgroundJobClient = (): Background => ({
  ...jobs,
});
