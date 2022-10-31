import { Aggregates } from 'core-domain';
import { create } from './user-create';
import { destroy } from './user-destroy';
import { findBy } from './user-find-by';
import { findMany } from './user-find-many';
import { update } from './user-update';

export const UserRepository: Aggregates['user'] = {
  create,
  update,
  destroy,
  findBy,
  findMany,
};
