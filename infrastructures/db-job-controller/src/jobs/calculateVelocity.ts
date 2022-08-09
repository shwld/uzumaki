import { addJob } from '../lib/addJob';
import { Background } from 'graphql-resolvers';

export const calculateVelocity: Background['calculateVelocity'] = {
  enqueue(payload) {
    addJob('calculateVelocity', payload);
  },
};
