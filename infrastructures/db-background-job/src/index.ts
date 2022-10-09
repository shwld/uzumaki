import { Background } from 'domain-interfaces';
import * as jobs from './jobs';

export const createJobController = (): Background => ({
  ...jobs,
});
