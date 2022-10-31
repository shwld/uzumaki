import { Aggregates } from 'core-domain';
import { create } from './user-create';
import { destroy } from './user-destroy';
import { findBy } from './user-find-by';
import { findByEmail } from './user-find-by-email';
import { findByUid } from './user-find-by-uid';
import { update } from './user-update';

export const UserRepository: Aggregates['user'] = {
  create,
  update,
  destroy,
  findBy,
  findByEmail,
  findByUid,
};
