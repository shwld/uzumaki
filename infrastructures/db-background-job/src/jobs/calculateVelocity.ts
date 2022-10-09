import { addJob } from '../lib/addJob';
import { Background } from 'domain-interfaces';

export const calculateVelocity: Background['calculateVelocity'] = {
  enqueue(payload) {
    addJob('calculateVelocity', payload);
  },
};
