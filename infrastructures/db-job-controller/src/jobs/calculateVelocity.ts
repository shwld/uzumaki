import { addJob } from '../lib/addJob';
import { Background } from 'graphql-resolvers';

export const hello: Background['calculateVelocity'] = {
  enqueue(payload) {
    addJob('calculateVelocity', payload);
  },
};
