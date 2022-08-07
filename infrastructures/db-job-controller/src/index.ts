import { Background } from 'graphql-resolvers';
import * as jobs from './jobs';

export const createJobController = (): Background => ({
  ...jobs,
});
