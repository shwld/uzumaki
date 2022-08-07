import { addJob } from '../lib/addJob';
import { Background } from 'graphql-resolvers';

export const hello: Background['hello'] = {
  enqueue(payload) {
    addJob('hello', payload);
  },
};
