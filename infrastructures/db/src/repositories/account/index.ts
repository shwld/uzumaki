import { Aggregates } from 'core-domain';
import { create } from './account-create';
import { destroy } from './account-destroy';
import { findBy } from './account-find-by';
import { findMany } from './account-find-many';
import { update } from './account-update';
import { findMembership } from './account-find-membership';
import { findMemberships } from './account-find-memberships';
import { find } from './account-find';

export const AccountRepository: Aggregates['account'] = {
  create,
  update,
  destroy,
  find,
  findBy,
  findMany,
  findMembership,
  findMemberships,
};
