import { Aggregates } from 'core-domain';
import { create } from './account-create';
import { destroy } from './account-destroy';
import { findBy } from './account-find-by';
import { findMany } from './account-find-many';
import { update } from './account-update';
import { membership } from './account-membership';
import { memberships } from './account-memberships';

export const AccountRepository: Aggregates['account'] = {
  create,
  update,
  destroy,
  findBy,
  findMany,
  membership,
  memberships,
};
